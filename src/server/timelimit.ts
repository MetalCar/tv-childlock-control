import { oncePerFiveSeconds } from "./minuteTimer";
import moment from "moment";
import { BehaviorSubject } from "rxjs";
import { powerOff } from "./commands/commands";
import { loadValue, persistValue } from "./nodeLocalStorage";

type TimeMap = {
  [date: string]: number;
};

enum StorageKey {
  DAILY_LIMIT = "dailyLimit",
  RESET_AT_HOUR = "resetAtHour",
  RESET_AT_MINUTE = "resetAtMinute",
  SPENT_MINUTES = "spentMinutes"
}

const DEFAULT_LIMIT = 120; // minutes
const DEFAULT_RESET_HOUR = 8;
const DEFAULT_RESET_MINUTE = 0;

export const useTimeLimit = (
  startImmediately: boolean,
  remote: any,
  onSuccess: () => void,
  onError: (err: unknown) => void = console.error
) => {
  const limitActiveState = new BehaviorSubject<boolean>(startImmediately);

  const isLimitActive = () => limitActiveState.getValue();

  const getDailyLimit = () =>
    loadValue<number>(StorageKey.DAILY_LIMIT) || DEFAULT_LIMIT;
  const getResetTime = () => ({
    hours: loadValue<number>(StorageKey.RESET_AT_HOUR) || DEFAULT_RESET_HOUR,
    minutes:
      loadValue<number>(StorageKey.RESET_AT_MINUTE) || DEFAULT_RESET_MINUTE
  });

  // Calculate the date for which to check the contingent.
  // Current time minus time to reset = contingent time
  const getToday = () => {
    const resetTime = getResetTime();
    return moment()
      .subtract(resetTime.hours, "hours")
      .subtract(resetTime.minutes, "minutes")
      .format("YYYY-MM-DD");
  };

  const getSpentMinutes = (date: string) => {
    const savedTimes = loadValue<TimeMap>(StorageKey.SPENT_MINUTES) || {};
    return savedTimes[date] || 0;
  };

  const saveSpentMinutes = (date: string, minutes: number) => {
    const savedTimes = loadValue<TimeMap>(StorageKey.SPENT_MINUTES) || {};
    const updatedTimes = { ...savedTimes, [date]: minutes };
    persistValue(StorageKey.SPENT_MINUTES, updatedTimes);
    return updatedTimes;
  };

  const logSpendMinutes = (isLimitActive: boolean) => {
    const spentTime = getSpentMinutes(getToday());
    console.log(
      "Time limit watcher",
      isLimitActive ? "started" : "stopped",
      spentTime,
      "of",
      getDailyLimit(),
      "minutes spent"
    );
  }

  const handleTimerTick = () => {
    remote.isAlive((err?: Error) => {
      logSpendMinutes(isLimitActive());

      if (!isLimitActive() || err) {
        return;
      }

      const today = getToday();
      const spentMinutes = getSpentMinutes(today);
      if (spentMinutes >= getDailyLimit()) {
        powerOff(remote, onSuccess, onError);
      } else {
        saveSpentMinutes(today, spentMinutes + 1);
      }
    });
  };

  const startTimeLimitWatcher = () => {
    limitActiveState.next(true);
  };

  const stopTimeLimitWatcher = () => {
    limitActiveState.next(false);
  };

  limitActiveState.subscribe((isLimitActive: boolean) => {
    logSpendMinutes(isLimitActive);
  });

  oncePerFiveSeconds.subscribe(handleTimerTick);

  return {
    setLimit: (minutes: number) => {
      if (isNaN(parseInt(minutes as any))) {
        throw new Error(`${typeof minutes} {minutes} is not a number`);
      }
      persistValue(StorageKey.DAILY_LIMIT, minutes);
    },
    setResetTime: ({ hour, minute = 0 }: { hour: number; minute?: number }) => {
      if (isNaN(parseInt(hour as any))) {
        throw new Error(`${typeof hour} {hour} is not a number`);
      }
      if (isNaN(parseInt(minute as any))) {
        throw new Error(`${typeof minute} {minute} is not a number`);
      }
      persistValue(StorageKey.RESET_AT_HOUR, hour);
      persistValue(StorageKey.RESET_AT_MINUTE, minute);
    },
    start: startTimeLimitWatcher,
    stop: stopTimeLimitWatcher,
    isActive: isLimitActive,
    getStatus: () => ({
      isActive: isLimitActive(),
      dailyLimit: getDailyLimit(),
      timeSpent: getSpentMinutes(getToday()),
      resetAt: getDailyLimit()
    })
  };
};

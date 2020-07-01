import { timer } from "rxjs";

const fiveSeconds = 5 * 1000; // ms

export const oncePerFiveSeconds = timer(fiveSeconds, fiveSeconds);

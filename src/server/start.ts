import express from "express";
import SamsungRemote from "samsung-remote";
import cors from "cors";
import { volumeUp, volumeMute, volumeDown, powerOff } from "./commands/commands";
import { useTimeLimit } from "./timelimit";
import { log } from "./lib/logger";

const TV_IP = process.env.TV_IP || '192.168.178.32';

const app = express();

let remote: any = {
  isAlive: (cb: (err: any) => void) => cb(new Error("TV not connected"))
};

var whitelist = ['http://localhost', 'http://localhost:1234', 'http://localhost:4321', undefined]

try {
  remote = new SamsungRemote({
    ip: TV_IP
  });

} catch (err) {
  console.error(err);
}

const connectToTV = async (callback: () => void) => {
  try {
    remote.isAlive((err: boolean) => {
      if (!err) {
        log(`Connected TV with IP ${TV_IP}`);
      }

      callback();
    });

  } catch (err) {
    console.error(err);
    callback();
  }
}

const wait1sec = () => {
  setTimeout(function(){
    connectToTV(wait1sec);
  }, 1000);
}

connectToTV(wait1sec);

var corsOptions = {
  origin: function(origin: any, callback: any) {
    log(`Origin ${origin} tries to request`);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

const timeLimit = useTimeLimit(true, remote, console.log, console.error);

const mkStatus = (isAlive = true) => ({
  ...remote,
  isAlive,
  timeLimit: timeLimit.getStatus()
});

app.use(cors(corsOptions));

app.get("/", (request: express.Request, response: express.Response) => {
  response.send("LOL");
});

app.get("/tv", (request: express.Request, response: express.Response) => {
  remote.isAlive((err: any) => {
    response.json(mkStatus(!err));
  });
});

app.get(
  "/tv/volume/up",
  (request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      if (err) {
        response.json(mkStatus(false));
      } else {
        volumeUp(
          remote,
          () => log(`Volume up the TV ${TV_IP}`),
          (error: any) => log(error)
        );
        response.json(mkStatus());
      }
    });
  }
);

app.get(
  "/tv/volume/down",
  (request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      if (err) {
        response.json(mkStatus(false));
      } else {
        volumeDown(
          remote,
          () => log(`Volume down the TV ${TV_IP}`),
          (error: any) => log(error)
        );
        response.json(mkStatus());
      }
    });
  }
);

app.get(
  "/tv/volume/mute",
  (request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      if (err) {
        response.json(mkStatus(false));
      } else {
        volumeMute(
          remote,
          () => log(`Volume mute the TV ${TV_IP}`),
          (error: any) => log(error)
        );
        response.json(mkStatus());
      }
    });
  }
);

app.get(
  "/tv/power/off",
  (request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      if (err) {
        response.json(mkStatus(false));
      } else {
        powerOff(
          remote,
          () => log(`Powered off the TV ${TV_IP}`),
          (error: any) => log(error)
        );
        response.json(mkStatus());
      }
    });
  }
);

app.get(
  "/tv/time-limit/on",
  (_request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      timeLimit.start();
      response.json(mkStatus(!err));
    });
  }
);

app.get(
  "/tv/time-limit/off",
  (_request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      timeLimit.stop();
      response.json(mkStatus(!err));
    });
  }
);

app.listen(4321);

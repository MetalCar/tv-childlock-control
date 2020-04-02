import express from "express";
import SamsungRemote from "samsung-remote";
import cors from "cors";
import { volumeUp, volumeMute, volumeDown, powerOff } from "./commands/commands";
import { useTimeLimit } from "./timelimit";

const TV_IP = process.env.TV_IP || 'xxx.xxx.xxx.xxx';

const app = express();

let remote: any = {
  isAlive: (cb: (err: any) => void) => cb(new Error("TV not connected"))
};

var whitelist = ['http://localhost', 'http://localhost:1234', 'http://localhost:4321', undefined]
try {
  remote = new SamsungRemote({
    ip: TV_IP
  });
  console.log(`Connected TV with IP ${TV_IP}`);
} catch (err) {
  console.error(err);
}

var corsOptions = {
  origin: function(origin: any, callback: any) {
    console.log(`Origin ${origin} tries to request`);
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
          () => console.log(`Volume up the TV ${TV_IP}`),
          (error: any) => console.log(error)
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
          () => console.log(`Volume down the TV ${TV_IP}`),
          (error: any) => console.log(error)
        );
        response.json(mkStatus);
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
          () => console.log(`Volume mute the TV ${TV_IP}`),
          (error: any) => console.log(error)
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
          () => console.log(`Powered off the TV ${TV_IP}`),
          (error: any) => console.log(error)
        );
        response.json(mkStatus());
      }
    });
  }
);

app.get(
  "/tv/timeLimit/on",
  (_request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      timeLimit.start();
      response.json(mkStatus(!err));
    });
  }
);

app.get(
  "/tv/timeLimit/off",
  (_request: express.Request, response: express.Response) => {
    remote.isAlive((err: any) => {
      timeLimit.stop();
      response.json(mkStatus(!err));
    });
  }
);

app.listen(4321);

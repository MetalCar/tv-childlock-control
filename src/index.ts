import SamsungRemote from "samsung-remote";
import Poller from './lib/poller';
import express from 'express';
import { KEYS } from "./constants/Keys";

const poller = new Poller(250);
const app = express();

const remote = new SamsungRemote({
  ip: 'xxx.xxx.xxx.xxx' // required: IP address of your Samsung Smart TV
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

let timerShouldEnd = false;
let timer: any = null;
let secondsToReach = 10;
let actualSeconds = 0;

const checkTVAlive = () => {
  remote.isAlive((err: any) => {
    if (err) {
      console.log('TV is offline');

      if (timerShouldEnd) {
        clearInterval(timer);
        timer = null;
      }
    } else {
      console.log('TV is ALIVE!');
      if (!timer) {
        timer = setInterval(() => {
          if (actualSeconds == secondsToReach) {
            //Turn TV off here
            actualSeconds = 0;
            timerShouldEnd = true;

            remote.send(KEYS.KEY_POWEROFF, (err:any) => {
              if (err) {
                  throw new Error(err);
              } else {
                  console.log("Time is reached");
              }
          });
          }
          actualSeconds++;
        }, 1000);
      }

      if (timerShouldEnd) {
        clearInterval(timer);
        timer = null;
      }
    }
    poller.poll();
  });
};

poller.onPoll(checkTVAlive);
poller.poll();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


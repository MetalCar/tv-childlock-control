import SamsungRemote from "samsung-remote";
import { volumeMute } from "./commands/commands";

const remote = new SamsungRemote({
  ip: 'xxx.xxx.xxx.xxx' // required: IP address of your Samsung Smart TV
});

remote.isAlive((err: any) => {
  if (err) {
    console.log('TV is offline');
  } else {
    console.log('TV is ALIVE!');
    volumeMute(remote, null, null);
  }
});


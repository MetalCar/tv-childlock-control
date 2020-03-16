import { KEYS } from "../constants/Keys";

export const sendKeys = (key: KEYS, remote: any, done: () => void, fail: (err:any) => void) => {
  remote.send(key, (err:any) => {
    if (err) {
      fail(err);
    } else {
      done();
    }
  });
}
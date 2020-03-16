import { sendKeys } from './send_keys';
import { KEYS } from '../constants/Keys';

export const volumeDown = (remote: any, done: () => void, fail: (err:any) => void) => sendKeys(KEYS.KEY_VOLDOWN, remote, done, fail);
export const volumeMute = (remote: any, done: () => void, fail: (err:any) => void) => sendKeys(KEYS.KEY_MUTE, remote, done, fail);
export const volumeUp = (remote: any, done: () => void, fail: (err:any) => void) => sendKeys(KEYS.KEY_VOLUP, remote, done, fail);
export const powerOff = (remote: any, done: () => void, fail: (err:any) => void) => sendKeys(KEYS.KEY_POWEROFF, remote, done, fail);
export const numpadNine = (remote: any, done: () => void, fail: (err:any) => void) => sendKeys(KEYS.KEY_9, remote, done, fail);

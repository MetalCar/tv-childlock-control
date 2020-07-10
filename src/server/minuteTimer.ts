import { timer } from "rxjs";

const oneMinute = 60 * 1000; // ms

export const oncePerMinute = timer(oneMinute, oneMinute);

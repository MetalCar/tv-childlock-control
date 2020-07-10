import moment from "moment";

export const log = (...message: string[]) => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`, ...message);
}
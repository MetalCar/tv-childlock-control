import { LocalStorage } from "node-localstorage";

const storageDataFile = process.env["STORAGE_FILE"] || "./storageData";
const localStorage = new LocalStorage(storageDataFile);

export const persistValue = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));
export const loadValue = <T>(key: string) => {
  const serialized = localStorage.getItem(key);
  return serialized ? (JSON.parse(serialized) as T) : undefined;
};

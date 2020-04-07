declare module "node-localstorage" {
  export class LocalStorage {
    constructor(storageDirectory: string);
    getItem: (storageKey: string) => string | undefined;
    setItem: (storageKey: string, value: string) => void;
    removeItem: (storageKey: string) => void;
    clear: () => void;
    key: (n: number) => any | undefined;
  }
}

import { atom } from "recoil";

export const globalLoadingDataAtom = atom({
  key: 'globalLoadingData',
  default: new Map<string, string>(),
});

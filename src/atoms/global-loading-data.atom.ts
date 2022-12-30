import { atom } from "recoil";
import { v1 } from "uuid";

export const globalLoadingDataAtom = atom({
  key: `globalLoadingData${v1()}`,
  default: new Map<string, string>(),
});

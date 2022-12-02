import { atom } from "recoil";

export const deviceTypeAtom = atom({
  key: 'deviceType',
  default: 'pc' as 'pc' | 'mobile',
});

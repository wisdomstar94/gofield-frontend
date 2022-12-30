import { atom } from "recoil";
import { v1 } from "uuid";

export const deviceTypeAtom = atom({
  key: `deviceType${v1()}`,
  default: 'pc' as 'pc' | 'mobile',
});

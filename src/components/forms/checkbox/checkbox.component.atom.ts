import { atom } from "recoil";
import { ICheckbox } from "./checkbox.interface";

export const checkboxChangeInfoAtom = atom({
  key: 'checkboxChangeInfo',
  default: null as null | ICheckbox.CheckboxChangeInfo,
});

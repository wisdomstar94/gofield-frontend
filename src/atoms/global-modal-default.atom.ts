import { atom } from "recoil";
import { IModalDefault } from "../components/modals/modal-default/modal-default.interface";

export const globalModalDefaultModalItemAtom = atom({
  key: 'globalModalDefaultModalItem',
  default: null as null | IModalDefault.ModalItem,
});

import { atom } from "recoil";
import { IModalDefault } from "../components/modals/modal-default/modal-default.interface";
import { v1 } from "uuid";

export const globalModalDefaultModalItemAtom = atom({
  key: `globalModalDefaultModalItem${v1()}`,
  default: null as null | IModalDefault.ModalItem,
});

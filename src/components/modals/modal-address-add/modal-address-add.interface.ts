import React from "react";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalAddressAdd {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface DetailInfo {
    getterName?: string;
    cp?: string;
    postNumber?: string;
    addrBasic?: string;
    addrDetail?: string;
    isDefault?: boolean;
  }

  export interface Props {
    __detailInfo?: DetailInfo;
    __modalState?: IModal.ModalState;

    children?: React.ReactNode;
  }
}
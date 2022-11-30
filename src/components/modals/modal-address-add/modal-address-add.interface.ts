import React from "react";
import { IAddress } from "../../../interfaces/address/address.interface";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalAddressAdd {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export type Mode = 'new' | 'edit';

  // export interface DetailInfo {
  //   getterName?: string;
  //   cp?: string;
  //   postNumber?: string;
  //   addrBasic?: string;
  //   addrDetail?: string;
  //   isDefault?: boolean;
  // }

  export interface Props {
    __mode?: Mode;
    __detailInfo?: IAddress.AddressForm;
    __modalState?: IModal.ModalState;
    __onSubmitComplete?: () => void;

    children?: React.ReactNode;
  }
}
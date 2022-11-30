import React from "react";
import { IAddress } from "../../../interfaces/address/address.interface";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalAddressBook {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModal.ModalState;
    __onSelected?: (item: IAddress.AddressItem) => void;

    children?: React.ReactNode;
  }
}
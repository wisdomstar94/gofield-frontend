import React from "react";
import { IAddress } from "../../../interfaces/address/address.interface";

export declare namespace IAddressBookItem {
  export interface Props {
    __item?: IAddress.AddressItem
    __onDeleteComplete?: (item: IAddress.AddressItem) => void;
    __onEditComplete?: (item: IAddress.AddressItem) => void;
    __onSelectButtonClick?: (item: IAddress.AddressItem) => void;
    children?: React.ReactNode;
  }
}
import React from "react";

export declare namespace IAddressRowItem {
  export type AddressItemState = 'normal' | 'default';

  export interface Props {
    __addressItemState?: AddressItemState;
    __isNoneBorderBottom?: boolean;

    children?: React.ReactNode;
  }
}
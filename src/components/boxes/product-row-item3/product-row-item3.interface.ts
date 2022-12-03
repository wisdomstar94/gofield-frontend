import React from "react";

export declare namespace IProductRowItem3 {
  export type ButtonLayoutType = 'none' | 'exchange-refund-review' | 'order-delicery-cancel';

  export interface Props {
    __isTopRowShow?: boolean;
    __buttonLayoutType?: ButtonLayoutType;

    __imageUrl?: string;
    __productName?: string;
    __price?: number;
    __deliveryPrice?: number;
    __optionNames?: string[];
    __qty?: number;

    children?: React.ReactNode;
  }
}
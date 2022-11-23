import React from "react";

export declare namespace IProductRowItem3 {
  export type ButtonLayoutType = 'exchange-refund-review' | 'order-delicery-cancel';

  export interface Props {
    __buttonLayoutType?: ButtonLayoutType;
    children?: React.ReactNode;
  }
}
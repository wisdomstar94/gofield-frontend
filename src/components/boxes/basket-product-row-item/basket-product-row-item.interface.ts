import React from "react";
import { ICart } from "../../../interfaces/cart/cart.interface";

export declare namespace IBasketProductRowItem {
  export interface Props {
    __item?: ICart.CartItem;
    __onCheckboxChange?: (value: boolean) => void;
    __onCountChange?: (count: number) => void;
    __onDeleteButtonClick?: (item: ICart.CartItem) => void;
    children?: React.ReactNode;
  }
}
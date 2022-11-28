import React from "react";
import { IItem } from "../../../interfaces/item/item.interface";

export declare namespace INewOrOldProductListBox {
  export interface Props {
    __productId?: string;
    __items?: IItem.ProductRowItem[];

    children?: React.ReactNode;
  }
}
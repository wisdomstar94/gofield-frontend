import React from "react";
import { IItem } from "../../../interfaces/item/item.interface";

export declare namespace INewOrOldProductListBox {
  export interface Props {
    __bundleId?: string;
    __allItemCount?: number;
    __newItemCount?: number;
    __usedItemCount?: number;
    // __items?: IItem.ProductRowItem[];

    children?: React.ReactNode;
  }
}
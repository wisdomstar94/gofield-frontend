import React from "react";
import { IItem } from "../../../interfaces/item/item.interface";

export declare namespace IProductDetailFormBox {
  export type ProductType = 'new' | 'old';

  export interface RefObject {
    
  }

  export interface Props {
    __productType?: ProductType;
    __detailInfo?: IItem.ItemDetailInfoApiData;
    children?: React.ReactNode;
  }
}
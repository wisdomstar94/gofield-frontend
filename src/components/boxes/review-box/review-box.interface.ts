import React from "react";
import { IItem } from "../../../interfaces/item/item.interface";

export declare namespace IReviewBox {
  export interface Props {
    __productGroupId?: number;
    __productGroupDetailInfo?: IItem.BundleProductDetailApiData;

    children?: React.ReactNode;
  }
}
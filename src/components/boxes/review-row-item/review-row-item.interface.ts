import React, { CSSProperties } from "react";
import { IItem } from "../../../interfaces/item/item.interface";

export declare namespace IReviewRowItem {
  export interface Props {
    __style?: CSSProperties;
    __item?: IItem.ReviewItem;

    children?: React.ReactNode;
  }
}
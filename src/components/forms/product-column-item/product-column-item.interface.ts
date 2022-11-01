import React, { CSSProperties } from "react";

export declare namespace IProductColumnItem {
  export interface Props {
    __imageUrl?: string;
    __isHeart?: boolean;
    __brandNameComponent?: React.ReactNode;
    __productNameComponent?: React.ReactNode;

    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
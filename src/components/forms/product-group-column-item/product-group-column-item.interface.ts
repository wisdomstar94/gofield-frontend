import React, { CSSProperties } from "react";

export declare namespace IProductGroupColumnItem {
  export interface Props {
    __itemId?: number;
    __imageUrl?: string;
    __isHeart?: boolean;
    __isHeartLayout?: boolean;
    __brandNameComponent?: React.ReactNode;
    __productNameComponent?: React.ReactNode;
    __onClick?: () => void;
    __newProductPrice?: number;
    __oldProductPrice?: number;
    __price?: number;
    __reviewCount?: number;
    __reviewStarPoint?: number;

    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
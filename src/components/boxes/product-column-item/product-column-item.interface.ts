import React, { CSSProperties } from "react";

export declare namespace IProductColumnItem {
  export interface Props {
    __style?: CSSProperties;
    __itemId?: number;
    __isHeart?: boolean;
    __isHeartLayout?: boolean;
    __imageUrl?: string;
    __brandNameComponent?: React.ReactNode;
    __productNameComponent?: React.ReactNode;
    __price?: number;
    __tags?: string[];
    __onClick?: () => void;

    children?: React.ReactNode;
  }
}
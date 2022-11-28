import React, { CSSProperties } from "react";

export declare namespace IProductRowItem2 {
  export interface Props {
    __style?: CSSProperties;
    __onClick?: () => void;

    __imageUrl?: string;
    __brandName?: string;
    __productName?: string;
    __price?: number;
    __tags?: string[];

    children?: React.ReactNode;
  }
}
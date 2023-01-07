import React, { CSSProperties } from "react";

export declare namespace IReviewStarV2 {
  export type StarSizeType = 'small' | 'big';

  export interface RefObject {
    
  }

  export interface Props {
    __starSizeType?: StarSizeType;
    __fillPercent?: number | `${number}%`;
    __onClick?: () => void;
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
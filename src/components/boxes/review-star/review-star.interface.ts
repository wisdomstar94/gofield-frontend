import React, { CSSProperties } from "react";

export declare namespace IReviewStar {
  export type StarMode = 'fill' | 'stroke';

  export type StarSizeType = 'small' | 'big';

  export interface Props {
    __starMode?: StarMode;
    __starSizeType?: StarSizeType;
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
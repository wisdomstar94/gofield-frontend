import React, { CSSProperties } from "react";

export declare namespace IReviewStar {
  export type StarMode = 'fill' | 'stroke';

  export interface Props {
    __starMode?: StarMode;
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
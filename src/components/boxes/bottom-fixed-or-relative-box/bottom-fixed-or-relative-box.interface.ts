import React, { CSSProperties } from "react";

export declare namespace IBottomFixedOrRelativeBox {
  export type PositionState = 'fixed' | 'relative';

  export interface Props {
    // __isFixed?: boolean;
    __heightToRelative?: number;
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
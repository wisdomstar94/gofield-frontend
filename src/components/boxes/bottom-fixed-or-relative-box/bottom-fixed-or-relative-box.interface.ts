import React from "react";

export declare namespace IBottomFixedOrRelativeBox {
  export type PositionState = 'fixed' | 'relative';

  export interface Props {
    // __isFixed?: boolean;
    __heightToRelative?: number;
    children?: React.ReactNode;
  }
}
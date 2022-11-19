import React from "react";

export declare namespace IBottomFixedOrRelativeBox {
  export type PositionState = 'fixed' | 'relative';

  export interface Props {
    __heightToRelative?: number;
    children?: React.ReactNode;
  }
}
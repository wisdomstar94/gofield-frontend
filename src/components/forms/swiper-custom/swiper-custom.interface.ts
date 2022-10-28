import React, { CSSProperties } from "react";

export declare namespace ISwiperCustom {
  export interface Props {
    __style?: CSSProperties;
    __swipeSpeed?: number;
    __currentIndex?: number;
    __isLoop?: boolean;

    children?: React.ReactNode;
  }
}
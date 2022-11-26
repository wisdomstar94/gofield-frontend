import React, { CSSProperties } from "react";

export declare namespace ISwiperCustom {
  export interface Props {
    __style?: CSSProperties;
    __swipeSpeed?: number;
    __currentIndex?: number;
    __isLoop?: boolean;
    __onChange?: (currentIndex: number, nextCurrentIndex: number) => void;
    __onNotChange?: (currentIndex: number) => void;

    children?: React.ReactNode;
  }
}
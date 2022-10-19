import React from "react";
import { IScrollCheckHook } from "../../../hooks/use-scroll-check/use-scroll-check.interface";

export declare namespace IWindowSizeContainer {
  export interface Props {
    __bgColor?: string;
    __padding?: string;
    __zIndex?: number;
    __onScroll?: (info: IScrollCheckHook.ScrollInfo) => void;

    children: React.ReactNode;
  }
}
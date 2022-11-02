import React, { CSSProperties } from "react";

export declare namespace IBottomMenuBar {
  export interface MenuItem {
    menuIconComponent: React.ReactNode;
    menuNameComponent: React.ReactNode;
    menuLink: string;
  }

  export interface Props {
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
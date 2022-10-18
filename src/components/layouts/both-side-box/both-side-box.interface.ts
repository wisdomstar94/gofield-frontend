import React, { CSSProperties } from "react";

export declare namespace IBothSidebox {
  export interface Props {
    __leftComponent: React.ReactNode;
    __rightComponent: React.ReactNode;

    __style?: CSSProperties;
    __leftComponentStyle?: CSSProperties;
    __rightComponentStyle?: CSSProperties;
  }
}
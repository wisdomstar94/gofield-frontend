import React, { CSSProperties } from "react";

export declare namespace ITextArea {
  export interface Props {
    __value?: string;
    __onChange?: (value: string) => void;
    __style?: CSSProperties;
    __placeholder?: string;
    children?: React.ReactNode;
  }
}
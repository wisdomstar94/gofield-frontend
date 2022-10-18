import React from "react"

export declare namespace IStrokeButtons {
  export interface ButtonItem {
    textComponent: React.ReactNode;
    onClick: () => void;
  }

  export interface Props {
    __buttonItems: ButtonItem[];
  }
}
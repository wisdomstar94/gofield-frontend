import React from "react";

export declare namespace ILinkText {
  export type LinkStyleType = 'normal' | 'blue';

  export interface Props {
    __linkStyleType?: LinkStyleType;
    __onClick?: () => void;

    children: React.ReactNode;
  }
}
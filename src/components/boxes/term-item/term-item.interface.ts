import React from "react";

export declare namespace ITermItem {
  export interface RefObject {
    getInfo: () => TermInfo;
  }

  export interface TermInfo {
    isChecked?: boolean;
    childTermItems?: ChildTermItem[];
  }

  export interface ChildTermItem {
    isCheckBoxShow?: boolean;
    termName?: React.ReactNode;
    detailContentComponent?: React.ReactNode;
    isChecked?: boolean;
  }

  export interface Props {
    __childTermItems?: ChildTermItem[];
    __detailContentComponent?: React.ReactNode;
    __termName?: React.ReactNode;
    __isChecked?: boolean;
    __isOpened?: boolean;
    children?: React.ReactNode;
  }
}
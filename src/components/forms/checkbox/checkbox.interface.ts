import React from "react";

export declare namespace ICheckbox {
  export type CheckState = 'checked' | 'none-checked';
  export type CheckMode = 'single' | 'multiple';

  export interface CheckboxChangeInfo {
    name: string;
    value: string;
    checkState: CheckState;
  }

  export interface Props {
    __name: string;
    __value: string;
    __checkMode?: CheckMode; // default 는 multiple
    __checkState: CheckState;
    __onChange: (changeInfo: CheckboxChangeInfo) => void;

    children?: React.ReactNode;
  }
}
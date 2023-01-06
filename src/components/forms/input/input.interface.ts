import React, { CSSProperties } from "react";

export declare namespace IInput {
  export type InputType = 'text' | 'number' | 'password' | 'date' | 'time';
  export type FocusState = 'focus' | 'focusout';

  export interface RightLabel {
    component: React.ReactNode;
    width: number;
  }

  export interface Props {
    __type: InputType;
    __width?: string;
    __disable?: boolean;
    __placeholder?: string;
    __value?: string;
    __maxLength?: number;
    __rightLabel?: RightLabel;
    __style?: CSSProperties;
    __onChange: (value: string) => void;
  }
}
import React, { CSSProperties } from "react";

export declare namespace IButton {
  export type ButtonStyle = 
    'black-solid' | 
    'black-solid-radius' |
    'small-gray-stroke-radius' | 
    'small-gray-solid-radius' | 
    'gray-solid' | 
    'gray-solid-radius' | 
    'gray-stroke' | 
    'white-solid-gray-stroke' | 
    'white-solid-gray-stroke-radius'
  ;

  export interface Props {
    __buttonStyle?: ButtonStyle;
    __disable?: boolean;
    __onClick?: () => void;  
    __style?: CSSProperties;

    children: React.ReactNode;
  }
}
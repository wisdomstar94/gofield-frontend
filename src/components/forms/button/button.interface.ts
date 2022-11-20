import React from "react";

export declare namespace IButton {
  export type ButtonStyle = 
    'black-solid' | 
    'black-solid-radius' |
    'small-gray-stroke-radius' | 
    'small-gray-solid-radius' | 
    'gray-solid' | 
    'gray-solid-radius' | 
    'gray-stroke' | 
    'white-solid-gray-stroke'
  ;

  export interface Props {
    __buttonStyle?: ButtonStyle;
    __borderRadius?: string;
    __disable?: boolean;
    __onClick?: () => void;  

    children: React.ReactNode;
  }
}
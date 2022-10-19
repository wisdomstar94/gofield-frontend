import React from "react";

export declare namespace IButton {
  export type ButtonStyle = 
    'black-solid' | 
    'gray-stroke-radius' | 
    'gray-solid'
  ;

  export interface Props {
    __buttonStyle?: ButtonStyle;
    __disable?: boolean;
    __onClick?: () => void;  

    children: React.ReactNode;
  }
}
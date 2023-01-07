import React, { CSSProperties, MouseEventHandler } from "react";

export declare namespace IImageBox {
  export type SafeNumber = number | `${number}`;

  export interface Props {
    priority?: boolean;
    src?: string;
    alt?: string;
    title?: string;
    fill?: boolean;
    sizes?: string;
    draggable?: boolean;
    style?: CSSProperties;
    placeholder?: 'blur';
    blurDataURL?: string;
    width?: SafeNumber;
    height?: SafeNumber;
    mode: 'pure' | 'next-image';
    onClick?: Function;

    children?: React.ReactNode;
  }
}
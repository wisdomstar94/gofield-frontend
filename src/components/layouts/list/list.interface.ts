import React, { CSSProperties } from "react";
import { ListItem } from './list.component';

export declare namespace IList {
  export type Direction = 'vertical' | 'horizontal';
  export type FlexDirection = 'flex-start' | 'center' | 'flex-end';

  export interface Props {
    __width?: string;
    __direction?: Direction;
    __justifyContent?: FlexDirection;
    __alignItems?: FlexDirection;
    __defaultItemAlignItems?: FlexDirection;
    __defaultItemJustifyContent?: FlexDirection;
    __defaultItemMarginRight?: string;
    __defaultItemMarginBottom?: string;
    __style?: CSSProperties;

    children: React.ReactNode;
  }

  export interface ItemProps {
    __alignItems?: FlexDirection;
    __justifyContent?: FlexDirection;
    __marginRight?: string;
    __marginBottom?: string;
    __style?: CSSProperties;

    children: React.ReactNode;
  }
}

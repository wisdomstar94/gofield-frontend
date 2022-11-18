import React, { CSSProperties } from "react";

export declare namespace IBottomMenuBar {
  export type MenuId = 
    'category' |
    'old-product' |
    'home' |
    'likes' |
    'my-page' |
    ''
  ;

  export interface MenuItem {
    menuId: MenuId;
    menuIconComponent: React.ReactNode;
    menuNameComponent: React.ReactNode;
    menuLink: string;
  }

  export interface Props {
    __style?: CSSProperties;
    __activeMenuId?: MenuId;
    children?: React.ReactNode;
  }
}
import React from "react";

export declare namespace IMenuRowList {
  export interface MenuItem {
    menuNameComponent: React.ReactNode;
    menuLink: string;
    menuClickCallback?: () => void;
  }

  export interface Props {
    __menuItems?: MenuItem[];

    children?: React.ReactNode;
  }
}
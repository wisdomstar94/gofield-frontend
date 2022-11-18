import React from "react";

export declare namespace IMenuRowList {
  export interface MenuItem {
    menuNameComponent: React.ReactNode;
    menuLink: string;
  }

  export interface Props {
    __menuItems?: MenuItem[];

    children?: React.ReactNode;
  }
}
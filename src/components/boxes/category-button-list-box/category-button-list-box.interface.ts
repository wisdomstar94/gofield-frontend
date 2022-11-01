import React, { CSSProperties } from "react";

export declare namespace ICategoryButtonListBox {
  export interface CategoryItem {
    iconUrl: string;
    categoryId: string;
    categoryName: string;
    link: string;
  }

  export interface Props {
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
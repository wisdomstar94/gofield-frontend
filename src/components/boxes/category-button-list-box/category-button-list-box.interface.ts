import React, { CSSProperties } from "react";

export declare namespace ICategoryButtonListBox {
  export interface CategoryItem {
    // iconUrl: string;
    isDummy?: boolean;
    icon: React.ReactNode;
    categoryId: string;
    categoryName: string;
    link: string;
  }

  export interface Props {
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
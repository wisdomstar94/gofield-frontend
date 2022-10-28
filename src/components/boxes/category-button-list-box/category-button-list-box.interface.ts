import React from "react";

export declare namespace ICategoryButtonListBox {
  export interface CategoryItem {
    iconUrl: string;
    categoryId: string;
    categoryName: string;
    link: string;
  }

  export interface Props {
    children?: React.ReactNode;
  }
}
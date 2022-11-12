import React from "react";

export declare namespace IViewFilterBox {
  export type OptionType = 'category' | 'order-by' | 'product-status';

  export interface Props {
    __optionTypes?: OptionType[];
    __selectedCategory?: string;
    __selectedOrderBy?: string;
    __selectedProductStatus?: string;

    children?: React.ReactNode;
  }
}
import React from "react";

export declare namespace IProductDetailFormBox {
  export type ProductType = 'new' | 'old';

  export interface RefObject {
    
  }

  export interface Props {
    __productType?: ProductType;

    children?: React.ReactNode;
  }
}
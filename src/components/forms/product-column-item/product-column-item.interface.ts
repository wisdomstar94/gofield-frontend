import React, { CSSProperties } from "react";

export declare namespace IProductColumnItem {
  export interface Props {
    __imageUrl?: string;
    __isHeart?: boolean;
    __brandNameComponent?: React.ReactNode;
    __productNameComponent?: React.ReactNode;
    __onClick?: () => void;

    /**
     * @description 새상품 최저가, 중고상품 최저가, 리뷰 별점
     */
    __infoTypeA?: {
      newProductPrice: number;
      oldProductPrice: number;
      reviewCount: number;
      reviewStarPoint: number;
    };

    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
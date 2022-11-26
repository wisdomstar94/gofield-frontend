import React, { CSSProperties } from "react";

export declare namespace IProductGroupColumnItem {
  // export type LayoutType = 'a' | 'b';

  export interface Props {
    __imageUrl?: string;
    __isHeart?: boolean;
    __isHeartLayout?: boolean;
    __brandNameComponent?: React.ReactNode;
    __productNameComponent?: React.ReactNode;
    __onClick?: () => void;
    __newProductPrice?: number;
    __oldProductPrice?: number;
    __price?: number;
    __reviewCount?: number;
    __reviewStarPoint?: number;

    // __isShowNewOrOldPrice?: boolean;
    // __isShowReviewInfo?: boolean;
    // __isShowPrice?: boolean;
    /**
     * @description 새상품 최저가, 중고상품 최저가, 리뷰 별점
     */
    // __infoTypeA?: {
    //   newProductPrice: number;
    //   oldProductPrice: number;
    //   reviewCount: number;
    //   reviewStarPoint: number;
    // };

    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
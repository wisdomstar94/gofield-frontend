import React from "react";

export declare namespace IReviewDetailFormBox {
  export interface DetailInfo {
    reviewStarCount?: number;
    height?: string;
    weight?: string;
    content?: string;
  }

  export interface RefObject {
    
  }

  export interface Props {
    __detailInfo?: DetailInfo;
    __orderItemId?: string | number;
    __orderNumber?: string;
    children?: React.ReactNode;
  }
}
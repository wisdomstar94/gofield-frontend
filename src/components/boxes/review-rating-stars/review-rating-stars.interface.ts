import React, { CSSProperties } from "react";

export declare namespace IReviewRatingStars {
  export interface RefObject {
    
  }

  export interface Props {
    __style?: CSSProperties;
    __reviewScore?: number;
    __isAllowScoreControl?: boolean;
    __onReviewScoreChange?: (score: number) => void;
    children?: React.ReactNode;
  }
}
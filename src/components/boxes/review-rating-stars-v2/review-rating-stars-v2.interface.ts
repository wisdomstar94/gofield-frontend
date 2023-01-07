import React, { CSSProperties } from "react";

export declare namespace IReviewRatingStarsV2 {
  export interface RefObject {
    
  }

  export interface Props {
    __style?: CSSProperties;
    __reviewScore?: number;
    __isAllowScoreControl?: boolean;
    __isSmallStar?: boolean;
    __onReviewScoreChange?: (score: number) => void;
    children?: React.ReactNode;
  }
}
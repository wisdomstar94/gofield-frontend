import React from "react";

export declare namespace IQnaRowItem {
  export type QnaStatus = 'answer-expected' | 'answer-complete';

  export interface Props {
    __qnaStatus?: QnaStatus;
    __question?: string;
    __answer?: string;
    __isSecret?: boolean;

    children?: React.ReactNode;
  }
}
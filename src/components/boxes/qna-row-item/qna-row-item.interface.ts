import React from "react";
import { IQna } from "../../../interfaces/qna/qna.interface";

export declare namespace IQnaRowItem {
  export interface Props {
    __item?: IQna.QnaItem;
    // __qnaStatus?: IQna.Status;
    // __question?: string;
    // __answer?: string;
    // __isSecret?: boolean;

    children?: React.ReactNode;
  }
}
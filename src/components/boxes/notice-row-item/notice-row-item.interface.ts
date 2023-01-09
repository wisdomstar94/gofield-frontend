import React from "react";
import { INotice } from "../../../interfaces/notice/notice.interface";

export declare namespace INoticeRowItem {
  export type State = 'default' | 'open' | 'close';

  export interface RefObject {
    
  }

  export interface Props {
    __state?: State;
    __item?: INotice.NoticeItem;
    children?: React.ReactNode;
  }
}
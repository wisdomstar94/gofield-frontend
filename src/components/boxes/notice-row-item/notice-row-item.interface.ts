import React from "react";

export declare namespace INoticeRowItem {
  export type State = 'default' | 'open' | 'close';

  export interface RefObject {
    
  }

  export interface Props {
    __state?: State;
    children?: React.ReactNode;
  }
}
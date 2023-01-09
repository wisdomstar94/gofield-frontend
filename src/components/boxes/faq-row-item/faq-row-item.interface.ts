import React from "react";
import { IFaq } from "../../../interfaces/faq/faq.interface";

export declare namespace IFaqRowItem {
  export type State = 'default' | 'open' | 'close';

  export interface RefObject {
    
  }

  export interface Props {
    __state?: State;
    __item?: IFaq.FaqItem;
    children?: React.ReactNode;
  }
}
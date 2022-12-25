import React from "react";
import { IPage } from "../../../interfaces/page/page.interface";

export declare namespace IPaginationBox {
  export interface RefObject {
    setPage: (page: IPage.Page) => void; 
  }

  export interface Props {
    __page?: IPage.Page;
    __onPageClick?: (page: number) => void;
    children?: React.ReactNode;
  }
}
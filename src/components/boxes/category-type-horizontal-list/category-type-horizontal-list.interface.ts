import React from "react";
import { ICommon } from "../../../interfaces/common/common.interface";

export declare namespace ICategoryTypeHorizontalList {
  export interface Props {
    __valueItems?: ICommon.ValueItem[];
    __activeValue?: string;
    __onItemClick?: (valueItem: ICommon.ValueItem) => void;

    children?: React.ReactNode;
  }
}
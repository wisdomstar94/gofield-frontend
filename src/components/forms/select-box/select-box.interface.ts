import React from "react";
import { ICommon } from "../../../interfaces/common/common.interface";

export declare namespace ISelectBox {
  export interface Props {
    __valueItems?: ICommon.ValueItem[];
    __value?: string;
    __placeholder?: string;
    __onChange?: (value: string) => void;

    children?: React.ReactNode;
  }
}
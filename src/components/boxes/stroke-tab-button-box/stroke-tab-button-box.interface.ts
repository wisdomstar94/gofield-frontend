import React, { CSSProperties } from "react";
import { ICommon } from "../../../interfaces/common/common.interface";

export declare namespace IStrokeTabButtonBox {
  export interface Props {
    __valueItems?: ICommon.ValueItem[];
    __activeValue?: string;
    __onTabClick?: (valueItem: ICommon.ValueItem) => void;
    __isItemBorderTopNone?: boolean;
    __style?: CSSProperties;
    children?: React.ReactNode;
  }
}
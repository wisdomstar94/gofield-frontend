import React from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { IModalBottomViewOptions } from "../../modals/modal-bottom-view-options/modal-bottom-view-options.interface";

export declare namespace IViewFilterBox {
  export type OptionType = 'category' | 'order-by' | 'product-status';

  export interface Props {
    __optionTypes?: OptionType[];
    __selectedCategory?: string;
    
    __orderByValueItems?: ICommon.ValueItem[];
    __selectedOrderBy?: string;

    __selectedProductStatus?: string;

    __onChange?: (info: IModalBottomViewOptions.OutputInfo) => void;

    children?: React.ReactNode;
  }
}
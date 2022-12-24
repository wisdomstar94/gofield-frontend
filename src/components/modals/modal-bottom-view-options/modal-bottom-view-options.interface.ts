import React from "react";
import { ICommon } from "../../../interfaces/common/common.interface";
import { IViewFilterBox } from "../../boxes/view-filter-box/view-filter-box.interface";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";

export declare namespace IModalBottomViewOptions {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface OutputInfo {
    selectedCategory: string;
    selectedOrderBy?: string;
    selectedProductStatus: string;
  }

  export interface Props {
    __modalState?: IModalBottom.ModalState;
    __optionTypes?: IViewFilterBox.OptionType[];
    __selectedCategory?: string;
    __orderByValueItems?: ICommon.ValueItem[];
    __selectedOrderBy?: string;
    __selectedProductStatus?: string;
    __onChanged?: (info: OutputInfo) => void;

    children?: React.ReactNode;
  }
}
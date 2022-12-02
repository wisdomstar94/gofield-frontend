import React from "react";
import { IItem } from "../../../interfaces/item/item.interface";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";

export declare namespace IModalBottomProductOptions {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModalBottom.ModalState;
    // __itemId?: string;
    // __itemNumber?: string;
    // __price?: number;
    __detailInfo?: IItem.ItemDetailInfoApiData;
    children?: React.ReactNode;
  }
}
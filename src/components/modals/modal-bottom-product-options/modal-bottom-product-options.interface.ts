import React from "react";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";

export declare namespace IModalBottomProductOptions {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModalBottom.ModalState;
    __itemId?: string;
    __itemNumber?: string;
    __price?: number;
    children?: React.ReactNode;
  }
}
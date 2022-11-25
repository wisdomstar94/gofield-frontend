import React from "react";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";

export declare namespace IModalBottomProductOptions {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModalBottom.ModalState;
    children?: React.ReactNode;
  }
}
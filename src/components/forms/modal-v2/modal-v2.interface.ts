import React from "react";
import { IModal } from "../modal/modal.interface";

export declare namespace IModalV2 {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModal.ModalState;
    children?: React.ReactNode;
  }
}
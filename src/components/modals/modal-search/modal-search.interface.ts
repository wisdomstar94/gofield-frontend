import React from "react";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalSearch {
  export type ModalState = '' | 'show' | 'hide';

  export interface RefObject {
    getModal: () => IModal.RefObject | null;
  }

  export interface Props {
    __modalState?: ModalState;

    children?: React.ReactNode;
  }
}
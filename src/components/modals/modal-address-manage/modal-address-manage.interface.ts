import React from "react";

export declare namespace IModalAddressManage {
  export type ModalState = '' | 'show' | 'hide';

  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: ModalState;

    children?: React.ReactNode;
  }
}
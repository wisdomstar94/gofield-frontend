import React from "react";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalSignupNotice {
  export interface RefObject {
    show: () => void;
    hide: () => void;
  }

  export interface Props {
    __modalState?: IModal.ModalState;
    children?: React.ReactNode;
  }
}
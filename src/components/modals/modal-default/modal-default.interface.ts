import React from "react";

export declare namespace IModalDefault {
  export type ButtonState = '' | 'show' | 'hide';
  export type ModalState = '' | 'show' | 'hide';

  export type ShowFunction = (modalItem: ModalItem) => void;
  export type HideFunction = (modalItem: ModalItem) => void;

  export interface ModalItem {
    uuid?: string;
    titleStyleA?: {
      component: React.ReactNode;
    };
    titleStyleB?: {
      component: React.ReactNode;
    };
    // titleComponent?: React.ReactNode;
    contentComponent: React.ReactNode;
    negativeButtonState: ButtonState;
    positiveButtonState: ButtonState;
    negativeButtonText?: string;
    positiveButtonText?: string;
    onNegativeButtonClick?: (hide: HideFunction, modalItem: ModalItem) => void;
    onPositiveButtonClick?: (hide: HideFunction, modalItem: ModalItem) => void;
    modalState?: ModalState; 
  }

  export interface RefObject {
    show: ShowFunction;
    hide: HideFunction;
  }

  export interface Props {

  }
}
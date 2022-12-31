import React from "react";
import { IModal } from "../../forms/modal/modal.interface";

export declare namespace IModalSwiper {
  export interface RefObject {
    show: () => void;
    hide: () => void;
    setSwiperInfo: (swiperItems: IModalSwiper.SwiperItem[], activeIndex?: number) => void;
  }

  export interface SwiperItem {
    reactNode: React.ReactNode;
  }

  export interface Props {
    __modalState?: IModal.ModalState;
    __swiperItems?: SwiperItem[];
    children?: React.ReactNode;
  }
}
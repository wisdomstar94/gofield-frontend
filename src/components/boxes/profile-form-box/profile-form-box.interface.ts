import React from "react";

export declare namespace IProfileFormBox {
  export interface RefObject {
    getDetailInfo: () => DetailInfo | undefined;
  }

  export interface DetailInfo {
    profileName?: string;
    name?: string;
    height?: string;
    weight?: string;
  }

  export interface Props {
    __detailInfo?: DetailInfo;

    children?: React.ReactNode;
  }
}
import React from "react";

export declare namespace IPhoneNumberFormBox {
  export interface RefObject {
    getDetailInfo: () => DetailInfo | undefined;
  }

  export interface DetailInfo {
    
  }

  export interface Props {
    __detailInfo?: DetailInfo;

    children?: React.ReactNode;
  }
}
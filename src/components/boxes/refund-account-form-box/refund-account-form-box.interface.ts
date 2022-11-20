import React from "react";

export declare namespace IRefundAccountFormBox {
  export interface RefObject {
    
  }

  export interface DetailInfo {
    accountHolderName?: string;
    bankId?: string;
    accountNumber?: string;
    privacyTermAgree?: boolean;
  }

  export interface Props {
    __detailInfo?: DetailInfo;

    children?: React.ReactNode;
  }
}
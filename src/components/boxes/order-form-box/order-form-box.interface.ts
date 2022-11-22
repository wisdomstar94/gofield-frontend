import React from "react";

export declare namespace IOrderFormBox {
  export type PaymentMethod = 'card' | 'deposit-without-bankbook' | 'bank-transfer';

  export interface ProductItem {

  }

  export interface DetailInfo {
    getterName?: string;
    cp?: string;
    postNumber?: string;
    addrBasic?: string;
    addrDetail?: string;
    requestMessage?: string;
    paymentMethod?: PaymentMethod;
    productItems?: ProductItem;
  }

  export interface Props {
    __detailInfo?: DetailInfo;
    children?: React.ReactNode;
  }
}
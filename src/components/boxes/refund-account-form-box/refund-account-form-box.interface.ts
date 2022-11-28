import React from "react";
import { IAccount } from "../../../interfaces/account/account.interface";
import { ICommon } from "../../../interfaces/common/common.interface";

export declare namespace IRefundAccountFormBox {
  export interface RefObject {
    getDetailInfo: () => IAccount.RefundAccountDetailInfo;
    clear: () => void;
  }

  export interface Props {
    __detailInfo?: IAccount.RefundAccountDetailInfo;

    children?: React.ReactNode;
  }
}
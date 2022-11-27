import React from "react";
import { IUser } from "../../../interfaces/user/user.interface";

export declare namespace IPhoneNumberFormBox {
  export interface RefObject {
    getDetailInfo: () => IUser.PhoneNumberChangeDetailInfo | undefined;
  }

  export interface Props {
    __detailInfo?: IUser.PhoneNumberChangeDetailInfo;

    children?: React.ReactNode;
  }
}
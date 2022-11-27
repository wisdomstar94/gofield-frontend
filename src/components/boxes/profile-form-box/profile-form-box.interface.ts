import React from "react";
import { IUser } from "../../../interfaces/user/user.interface";

export declare namespace IProfileFormBox {
  export interface RefObject {
    getDetailInfo: () => IUser.ProfileDetailInfo | undefined;
  }

  export interface Props {
    __detailInfo?: IUser.ProfileDetailInfo;

    children?: React.ReactNode;
  }
}
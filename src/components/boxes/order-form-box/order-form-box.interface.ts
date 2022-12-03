import React from "react";
import { IOrder } from "../../../interfaces/order/order.interface";

export declare namespace IOrderFormBox {
  export interface ProductItem {

  }

  export interface Props {
    __detailInfo?: IOrder.OrderFormDetailInfo;
    children?: React.ReactNode;
  }
}
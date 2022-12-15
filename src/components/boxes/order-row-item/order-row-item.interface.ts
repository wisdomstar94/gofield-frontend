import React from "react";
import { IOrder } from "../../../interfaces/order/order.interface";

export declare namespace IOrderRowItem {
  export interface Props {
    __orderListItem?: IOrder.OrderListItem;
    children?: React.ReactNode;
  }
}
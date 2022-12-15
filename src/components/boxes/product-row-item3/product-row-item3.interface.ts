import React from "react";
import { IOrder } from "../../../interfaces/order/order.interface";

export declare namespace IProductRowItem3 {
  // export type ButtonLayoutType = 'none' | 'exchange-refund-review' | 'order-delicery-cancel';
  export type ButtonWidthType = 'full' | 'half';
  export type ButtonType = 'exchange-refund' | 'delivery-check' | 'review-write';

  export interface ShowButtonTypeItem {
    buttonType: ButtonType;
    buttonWidthType: ButtonWidthType;
  }

  export interface Props {
    __isTopRowShow?: boolean;
    // __buttonLayoutType?: ButtonLayoutType;

    // __isExchangeRefundApplyButtonShow?: boolean;
    // __isDeliveryCheckButtonShow?: boolean;
    // __isReviewWriteButtonShow?: boolean;
    __showButtonTypes?: ShowButtonTypeItem[];
    __orderNumber?: string;
    __imageUrl?: string;
    __productName?: string;
    __price?: number;
    __deliveryPrice?: number;
    __optionNames?: string[];
    __qty?: number;
    __estimatedArriveDate?: string;
    __orderShippingStatus?: IOrder.OrderShippingStatus;
    __orderItemStatus?: IOrder.OrderShippingOrderItemStatus;
    __orderItemId?: string | number;
    __carrierId?: string | number | null;
    __trackId?: string | number | null;

    children?: React.ReactNode;
  }
}
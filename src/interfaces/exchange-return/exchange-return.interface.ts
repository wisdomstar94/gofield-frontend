import { IOrder } from "../order/order.interface";
import { IPage } from "../page/page.interface";

export declare namespace IExchangeReturn {
  export type Type = 'CANCEL' | 'CHANGE' | 'RETURN';

  export interface ExchangeReturnForm {
    orderItemId?: string;
    reason?: string;
    applyType?: string;
    shippingAddress?: IOrder.ShippingAddress;
    exchangeDetailContent?: string;
  }

  export interface CancelExchangeReturnItem {
    id: number;
    itemId: number;
    itemOptionId: number | null;
    name: string;
    optionName: string[] | null;
    price: number;
    qty: number;
    type: IOrder.OrderItemType;
  }

  export interface CancelExchangeReturnListItem {
    cancelItems: CancelExchangeReturnItem[];
    createDate: string;
    id: number;
    orderId: number;
    paymentType: IOrder.PaymentType;
    reason: string;
    recalledDate: string | null;
    refundAccount: string | null;
    refundBank: string | null;
    refundDate: string | null;
    refundName: string | null;
    status: IOrder.OrderShippingStatus;
    type: Type;
    comment: string;
  }

  export interface CancelExchangeReturnListApiData {
    list: CancelExchangeReturnListItem[];
    page: IPage.Page;
  }

  export interface CancelExchangeReturnListOptions {
    page: string;
    size: string;
    list: CancelExchangeReturnListItem[];
  }
}
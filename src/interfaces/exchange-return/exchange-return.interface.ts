import { IOrder } from "../order/order.interface";

export declare namespace IExchangeReturn {
  export interface ExchangeReturnForm {
    orderItemId?: string;
    reason?: string;
    applyType?: string;
    shippingAddress?: IOrder.ShippingAddress;
    exchangeDetailContent?: string;
  }
}
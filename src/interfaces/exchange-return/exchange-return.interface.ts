import { IOrder } from "../order/order.interface";
import { IPage } from "../page/page.interface";

export declare namespace IExchangeReturn {
  export type Type = 'CANCEL' | 'CHANGE' | 'RETURN';
  export type CancelExchangeReturnStatus = 
    'ORDER_CANCEL_REQUEST' | // 취소신청
    'ORDER_CANCEL_PROCESS' | // 취소처리중
    'ORDER_CANCEL_COMPLETE' | // 취소완료
    'ORDER_CANCEL_DENIED' | // 취소처리실패
    'ORDER_CHANGE_REQUEST' | // 교환신청
    'ORDER_CHANGE_COLLECT_PROCESS' | // 수거중
    'ORDER_CHANGE_COLLECT_PROCESS_COMPLETE' | // 수거완료
    'ORDER_CHANGE_REDELIVERY' | // 재배송
    'ORDER_CHANGE_DENIED' | // 교환처리실패
    'ORDER_CHANGE_COMPLETE' | // 교환완료
    'ORDER_RETURN_REQUEST' | // 반품신청
    'ORDER_RETURN_COLLECT_PROCESS' | // 수거중
    'ORDER_RETURN_COLLECT_PROCESS_COMPLETE' | // 수거완료
    'ORDER_RETURN_DENIED' | // 반품처리실패
    'ORDER_RETURN_COMPLETE' | // 반품완료
    ''
  ;

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
    itemNumber: string;
    itemOptionId: number | null;
    name: string;
    optionName: string[] | null;
    price: number;
    qty: number;
    type: IOrder.OrderItemType;
    thumbnail: string;
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

  export interface OrderCancelExchangeReturnDetailInfo {
    cancelNumber: string;
    cancelItems: CancelExchangeReturnItem[];
    carrier: number | null;
    content: string;
    createDate: string;
    id: number;
    orderId: number;
    orderNumber: string;
    paymentType: IOrder.PaymentType;
    paymentCompany: string;
    installlment: number;
    reason: string;
    recalledDate: null | string;
    receiver: string;
    receiverAddress: string;
    receiverAddressExtra: string;
    receiverTel: string;
    receiverZipCode: string;
    refundAccount: null | string;
    refundBank: null | string;
    refundDate: null | string;
    refundName: null | string;
    status: CancelExchangeReturnStatus;
    totalAmount: number;
    totalDelivery: number;
    totalDiscount: number;
    totalItem: number;
    totalRefund: number;
    totalPg: number;
    trackingNumber: string | null;
    type: Type;
  }
}
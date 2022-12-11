import { IAddress } from "../address/address.interface";

export declare namespace IOrder {
  export type PaymentMethod = 'card' | 'deposit-without-bankbook' | 'bank-transfer';
  export type Environment = 'LOCAL' | 'DEV' | 'PROD';
  export type PaymentType = 'CARD' | 'EASYPAY' | 'BANK';
  export type ChargeType = 'FREE' | 'FIXED' | 'EACH';
  export type OptionType = 'SIMPLE' | 'COMBINATION';
  export type OrderStatus = 'ORDER_CREATE' | 'ORDER_CANCEL' | 'ORDER_APPROVAL' | 'ORDER_COMPLETE' | 'ORDER_DELETE';
  export type OrderShippingStatus = 'ORDER_SHIPPING_CHECK' | 'ORDER_SHIPPING_CANCEL' | 'ORDER_SHIPPING_CHECK_COMPLETE' | 'ORDER_SHIPPING_READY' | 'ORDER_SHIPPING_DELIVERY' | 'ORDER_SHIPPING_DELIVERY_COMPLETE' | 'ORDER_SHIPPING_COMPLETE' | 'ORDER_SHIPPING_DELETE';
  export type Classification = 'ALL' | 'USED' | 'NEW';
  export type OrderShippingOrderItemStatus = 'ORDER_ITEM_RECEIPT' | 'ORDER_ITEM_APPROVE' | 'ORDER_ITEM_RECEIPT_CANCEL' | 'ORDER_ITEM_APPROVE_CANCEL';  

  export interface OrderSheetItem {
    cartId?: number | null;
    itemNumber: string;
    qty: number;
  }

  export interface OrderSheetCreateApiData {
    code: string;
  }

  export interface PriceInfoItem {
    price: number;
    qty: number;
    condition: number;
    charge: number;
  }

  export interface OrderPaymentApiData {
    nextUrl: string;
  }
  

  export interface orderSheetListItem {
    brandName: string;
    charge: number;
    chargeType: ChargeType;
    condition: number;
    deliveryPrice: number;
    feeJeju: number;
    feeJejuBesides: number;
    id: number;
    isOption: boolean;
    itemNumber: string;
    name: string;
    optionId: number;
    optionName: string[];
    optionType: OptionType;
    price: number;
    qty: number;
    sellerId: number;
    thumbnail: string;
  }

  export interface OrderSheet {
    orderSheetList: orderSheetListItem[];
    totalDelivery: number;
    totalPrice: number;
  }

  export interface OrderSheetInfo {
    orderSheet: OrderSheet;
    shippingAddress: IAddress.AddressItem;
  }

  export interface ShippingAddress {
    address?: string;
    addressExtra?: string;
    name?: string;
    shippingCode?: string;
    shippingComment?: string;
    tel?: string;
    zipCode?: string;
  }

  export interface OrderFormDetailInfo {
    companyCode?: string;
    environment?: Environment;
    paymentType?: PaymentType;
    shippingAddress?: ShippingAddress;
    uuid?: string;
  }

  export interface OrderShippingOrderItem {
    id: number;
    itemId: number;
    itemOptionId: number;
    itemNumber: string;
    name: string;
    optionName: string[];
    classification: Classification;
    thumbnail: string;
    status: OrderShippingOrderItemStatus;
    isReview: boolean;
    price: number;
    qty: number;
  }

  export interface OrderShippingListItem {
    id: number;
    shippingNumber: string;
    status: OrderShippingStatus;
    trackingNumber: string | null;
    chargeType: ChargeType;
    deliveryPrice: number;
    carrier: string | null;
    createDate: string;
    cancelDate: string | null;
    deliveryDate: string | null;
    deliveredDate: string | null;
    orderItems: OrderShippingOrderItem[];
  }

  export interface OrderDetailInfo {
    id: number;
    orderNumber: string;
    // totalPrice: number;
    totalItem: number;
    totalAmount: number;
    totalDiscount: number;
    totalDelivery: number;
    paymentCompany: string;
    status: OrderStatus;
    createDate: string;
    cancelDate: string | null;
    confirmDate: string | null;
    finishDate: string | null;
    tel: string;
    name: string;
    zipCode: string;
    address: string;
    addressExtra: string;
    shippingComment: string | null;
    orderShippingList: OrderShippingListItem[];
  }
}
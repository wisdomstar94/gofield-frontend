import { IAddress } from "../address/address.interface";

export declare namespace IOrder {
  export type PaymentMethod = 'card' | 'deposit-without-bankbook' | 'bank-transfer';
  export type Environment = 'LOCAL' | 'DEV' | 'PROD';
  export type PaymentType = 'CARD' | 'EASYPAY' | 'BANK';

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
    deliveryPrice: number;
    id: number;
    itemNumber: string;
    name: string;
    optionName: string[];
    price: number;
    qty: number;
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
}
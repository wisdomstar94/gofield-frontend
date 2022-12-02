export declare namespace IOrder {
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
}
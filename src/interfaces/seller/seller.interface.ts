import { IShipping } from "../shipping/shipping.interface";

export declare namespace ISeller {
  export interface SellerInfoApiData {
    id: number;
    name: string;
    tel: string;
    shippingTemplate: IShipping.ShippingTemplate;
  }
}
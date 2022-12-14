import { IItem } from "../item/item.interface";
import { IShipping } from "../shipping/shipping.interface";

export declare namespace ICart {
  export interface CartCountApiData {
    totalCount: number;
  }

  export interface CartItem {
    id: number;
    itemName: string;
    itemNumber: string;
    sellerId: number;
    sellerName: string;
    optionName: null | string[],
    thumbnail: string;
    qty: number;
    isOrder: boolean;
    classification: IItem.Classification;
    spec: IItem.Spec;
    gender: IItem.Gender;
    isCondition: boolean;
    condition: number;
    chargeType: IShipping.ChargeType;
    charge: number;
    feeJeju: number;
    feeJejuBesides: number;
    price: number;
    isChecked: boolean;
    delivery: IItem.Delivery;
    deliveryPrice: number;
  }
}
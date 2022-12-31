export declare namespace IShipping {
  export type ChargeType = 'FREE' | 'FIXED' | 'EACH';

  export interface ShippingTemplate {
    "address": string;
    "addressExtra": string;
    "charge": number;
    "chargeType": ChargeType;
    "condition": number;
    "exchangeCharge": number;
    "exchangeCourierName": string;
    "feeJeju": number;
    "feeJejuBesides": number;
    "id": number;
    "isCondition": boolean;
    "isFee": boolean;
    "isPaid": boolean;
    "receiver": string;
    "receiverTel": string;
    "returnAddress": string;
    "returnAddressExtra": string;
    "returnZipCode": string;
    "sellerId": number;
    "shippingComment": string;
    "takebackCharge": number;
    "title": string;
    "zipCode": string;
  }
}
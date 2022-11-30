export declare namespace IAddress {
  export interface AddressItem {
    id: number;
    tel: string;
    name: string;
    zipCode: string;
    address: string;
    addressExtra: string;
    isMain: boolean;
  }

  export interface AddressForm {
    id: number;
    address: string;
    addressExtra: string;
    isMain: boolean;
    name: string;
    tel: string;
    zipCode: string;
  }
}
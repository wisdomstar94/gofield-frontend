export declare namespace IItem {
  export type Classification = 'ALL' | 'USED' | 'NEW';
  export type Spec = 'BEST' | 'UPPER' | 'MIDDLE' | 'LOWER';
  export type Gender = 'MALE' | 'FEMALE';
  export type Delivery = 'FREE' | 'PAY';
  export type ChargeType = 'FREE' | 'FIXED' | 'EACH';
  export type OptionType = 'COMBINATION' | 'SIMPLE';
  export type OptionStatus = 'SOLD_OUT' | 'SALE';

  export interface OptionItem {
    key: string;
    value: string;
  }

  export interface BundleProductItem {
    id: number;
    name: string;
    brandName: string;
    thumbnail: string;
    reviewCount: number;
    reviewScore: number;
    newLowestPrice: number;
    usedLowestPrice: number;
  }

  export interface ReviewItem {
    id: number;
    name: string;
    nickName: string;
    optionName: string;
    weight: number;
    height: number;
    reviewScroe: number;
    description: string;
    createDate: string;
    images: string[];
  }

  export interface ProductRowItem {
    id: number;
    itemNumber: string;
    name: string;
    brandName: string;
    thumbnail: string;
    price: number;
    likeId: null | number;
    classification: Classification;
    gender: Gender;
    tags: string[];
  }

  export interface BundleProductDetailApiData {
    id: number;
    name: string;
    brandName: string;
    thumbnail: string;
    reviewCount: number;
    reviewScore: number;
    newLowestPrice: number;
    usedLowestPrice: number;
    newItemCount: number;
    usedItemCount: number;
    images: string[];
    items: ProductRowItem[];
  }

  export interface ShippingTemplate {
    id: number;
    sellerId: number;
    title: string;
    isCondition: boolean;
    condition: number;
    chargeType: ChargeType;
    charge: number;
    isPaid: boolean;
    exchangeCourierName: string;
    exchangeCharge: number;
    takebackCharge: number;
    isFee: boolean;
    feeJeju: number;
    feeJejuBesides: number;
    shippingComment: string;
  }

  export interface ItemDetailInfoApiData {
    id: number;
    bundleId: number;
    name: string;
    brandName: string;
    thumbnail: string;
    itemNumber: string;
    price: number;
    qty: number;
    likeId: null | number;
    classification: Classification;
    spec: Spec;
    delivery: Delivery;
    gender: Gender;
    images: string[];
    option: OptionItem[];
    tags: string[];
    shippingTemplate: ShippingTemplate;
  }

  export interface OptionGroup {
    name: string;
    price: number;
  }

  export interface OptionGroupItem {
    id: number;
    groupTitle: string;
    optionType: OptionType;
    optionGroup: OptionGroup[];
    priceGroup: number[];
    isEssential: boolean;
    createDate: string;
  }

  export interface OptionItem {
    id: number;
    itemId: number;
    itemNumber: string;
    name: string[];
    optionType: OptionType;
    status: OptionStatus;
    price: number;
    optionPrice: number;
    qty: number;
    isUse: boolean;
    createDate: string;
  }

  export interface ProductOptionGroupListApiData {
    optionGroupList: OptionGroupItem[] | null;
    optionList: OptionItem[] | null;
  }
}
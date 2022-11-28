export declare namespace IItem {
  export type Classification = 'ALL' | 'USED' | 'NEW';

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
    gender: "MALE" | "FEMALE";
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
}
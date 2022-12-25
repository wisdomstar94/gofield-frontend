import { IItem } from "../item/item.interface";

export declare namespace IReview {
  export interface ReviewFormInfo {
    orderItemId?: number | string
    weight?: string;
    height?: string;
    reviewScore?: number;
    content?: string;
  }

  export interface ReviewListOptions {
    page: string;
    size: string;
    bundleId: string;
    list: IItem.ReviewItem[];
  }
}
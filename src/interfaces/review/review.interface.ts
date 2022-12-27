import { IFile } from "../file/file.interface";
import { IItem } from "../item/item.interface";
import { IOrder } from "../order/order.interface";

export declare namespace IReview {
  export interface ReviewFormInfo {
    orderItemId?: number | string
    weight?: string;
    height?: string;
    reviewScore?: number;
    content?: string;
    imageFileItems?: IFile.FileInfo[];
  }

  export interface ReviewListOptions {
    page: string;
    size: string;
    bundleId: string;
    list: IItem.ReviewItem[];
  }

  export interface ReviewWritableListOptions {
    page: string;
    size: string;
    list: ReviewWritableListItem[];
  }

  export interface ReviewHistoryListOptions {
    page: string;
    size: string;
    list: ReviewHistoryListItem[];
  }

  export interface ReviewHistoryListItem {
    description: string;
    images: string[];
    itemNumber: string;
    name: string;
    optionName: string[] | null;
    qty: number;
    reviewId: number;
    reviewScore: number;
    thumbnail: string;
    price: number;
  }

  export interface ReviewWritableListApiData {
    list: ReviewWritableListItem[];
  }

  export interface ReviewHistoryListApiData {
    list: ReviewHistoryListItem[];
  }

  export interface ReviewWritableListItem {
    id: number;
    bundleId: number;
    classification: IItem.Classification;
    itemNumber: string;
    name: string;
    optionId: number | null;
    optionName: string[] | null;
    optionPrice: number;
    optionQty: number;
    optionType: IItem.OptionType;
    orderNumber: string;
    price: number;
    qty: number;
    sellerId: number;
    sellerName: string;
    status: IOrder.OrderShippingStatus;
    thumbnail: string;
    finsiehdDate: string | null;
  }
}
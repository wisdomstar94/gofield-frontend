import { IFile } from "../file/file.interface";
import { IItem } from "../item/item.interface";

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
}
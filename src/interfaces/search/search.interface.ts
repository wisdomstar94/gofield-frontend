import { IItem } from "../item/item.interface";

export declare namespace ISearch {
  export interface KeywordItem {
    id: number;
    keyword: string;
  }

  export interface SearchListApiData {
    list: IItem.ProductRowItem[];
    totalCount: number;
  }
}
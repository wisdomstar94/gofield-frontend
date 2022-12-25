import { IItem } from "../item/item.interface";
import { IPage } from "../page/page.interface";

export declare namespace IBundle {
  export interface BundleItemListApiData {
    list: IItem.ProductRowItem[];
    page: IPage.Page;
  }
}
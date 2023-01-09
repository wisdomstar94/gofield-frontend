import { IPage } from "../page/page.interface";

export declare namespace INotice {
  export type NoticeType = 
    'NORMAL' | // 일반
    'EVENT' | // 이벤트
    'CHECK' | // 점검
    ''
  ;

  export interface NoticeItem {
    createDate: string;
    description: string;
    title: string;
    type: NoticeType;
  }

  export interface NoticeListOptions {
    page: string;
    size: string;
    list: NoticeItem[];
  }

  export interface NoticeListApiData {
    list: NoticeItem[];
    page: IPage.Page;
  }
}
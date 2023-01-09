import { IPage } from "../page/page.interface";

export declare namespace IFaq {
  export type FAQ_TYPE = 
    'LOGIN' | // 로그인
    'ITEM' | // 상품
    'ETC' | // 기타
    ''
  ;

  export interface FaqItem {
    answer: string;
    createDate: string;
    question: string;
    type: FAQ_TYPE;
  }

  export interface FaqListOptions {
    page: string;
    size: string;
    keyword: string;
    list: FaqItem[];
  }

  export interface FaqListApiData {
    list: FaqItem[];
    page: IPage.Page;
  }
}
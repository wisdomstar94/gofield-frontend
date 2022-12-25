import { IPage } from "../page/page.interface";

export declare namespace IQna {
  export type Status = 'COMPLETE' | 'RECEIPT';

  export interface QnaItem {
    id: number;
    title: string;
    status: Status;
    isVisible: boolean;
    isMe: boolean;
    createDate: string;
    nickName: string;
  }

  export interface QnaForm {
    description?: string;
    isVisible?: boolean;
    title?: string;
  }

  export interface QnaDetailInfoApiData {
    qnaId: number;
    title: string;
    description: string;
    answer: null | string,
    status: Status;
    isVisible: boolean;
    isMe: boolean;
    answerDate: null | string;
    createDate: string;
  }

  export interface QnaListApiData {
    list: QnaItem[];
    page: IPage.Page;
  }

  export interface QnaListOptions {
    page: string;
    size: string;
    itemId: string;
    isMe: string;
    list: QnaItem[];
  }
}
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
}
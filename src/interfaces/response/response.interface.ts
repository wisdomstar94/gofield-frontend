export declare namespace IResponse {
  export type ErrorAction = 'NONE' | 'TOAST' | 'RETRY';

  export interface CommonResponse<T> {
    status: boolean;
    message: string;
    data: T;
    error: ErrorResponse | null;
  }

  export interface ErrorResponse {
    code: string;
    action: ErrorAction;
    message: string;
  }
}
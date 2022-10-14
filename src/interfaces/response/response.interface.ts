export declare namespace IResponse {
  export interface CommonResponse<T> {
    // 미정, 협의 필요
    data: T;
  }

  export interface ErrorResponse {
    // 미정, 협의 필요
    code: number;
    msg: string;
  }
}
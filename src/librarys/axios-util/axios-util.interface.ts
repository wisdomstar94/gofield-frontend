import { GetServerSidePropsContext } from "next";

export declare namespace IAxiosUtil {
  export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'option';

  export interface Params {
    url: string;
    method: HttpMethod;
    data?: any;
    isAuth?: boolean;
    isRefreshApply?: boolean;
    params?: { [key: string]: string | string[] };
    headers?: { [key: string]: string },
    timeout?: number;
    context?: GetServerSidePropsContext;
  }
}
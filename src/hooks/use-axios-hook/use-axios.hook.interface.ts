export declare namespace IAxiosHook {
  export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'option';

  // export interface InstanceOptions {
  //   isAuth: boolean;
  //   isRefreshApply?: boolean;
  // }

  export interface InstanceOptions {
    url: string;
    method: HttpMethod;
    data?: any;
    isAuth?: boolean;
    isRefreshApply?: boolean;
    params?: { [key: string]: string | string[] };
    headers?: { [key: string]: string },
    timeout?: number;
  }
}
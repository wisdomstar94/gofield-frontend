import { IAxiosUtil } from "./axios-util.interface";
import axios, { AxiosError } from "axios";
import { getRandomToken } from "../random-util/random-util.library";
import { getJwtStatus } from "../jwt-util/jwt-util.library";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ILogin } from "../../interfaces/login/login.interface";
import { GetServerSidePropsContext } from "next";
import { CookieValueTypes, getCookie, setCookie } from "cookies-next";

function isAccessTokenInvalid(error: AxiosError<IResponse.CommonResponse<null>>) {
  // access token 이 만료되거나 유효하지 않다는 응답을 체크하는 로직 작성. 만료 & 유효하지 않다는 응답이 맞으면 true, 그렇지 않으면 false 를 반환하도록 작성하면 됨.
  if (error.response?.data.error?.code === 'U4100') {
    return true;
  }

  return false;
}

export function getAccessToken(ctx: GetServerSidePropsContext | undefined): CookieValueTypes {
  // console.log('@@req ctx?.req.cookies', ctx?.req.cookies);
  return getCookie('access_token', { req: ctx?.req, res: ctx?.res });
}

export function getRefreshToken(ctx: GetServerSidePropsContext | undefined): CookieValueTypes {
  return getCookie('refresh_token', { req: ctx?.req, res: ctx?.res });
}

function setAccessToken(ctx: GetServerSidePropsContext | undefined, token: string) {
  if (ctx === undefined) return;
  // ctx.res.setHeader('set-cookie', token);
  setCookie('access_token', token, { req: ctx.req, res: ctx.res, maxAge: 60 * 1440 * 4 });
}

function refreshAccessToken(params: IAxiosUtil.Params) {
  return new Promise<boolean>((resolve, reject) => {
    getAxiosInstance<IResponse.CommonResponse<ILogin.RefreshData>>({ 
      isAuth: true, 
      isRefreshApply: false, 
      url: Config().api.auth.refresh._,
      method: 'post',
      data: {
        refreshToken: getRefreshToken(params.context),
      },
    }).then(response => {
      setAccessToken(params.context, response.data.data.accessToken);
      resolve(true);
    }).catch(error => {
      console.error(error);
      resolve(false);
    });
  });
}

export function getAxiosInstance<T>(params: IAxiosUtil.Params) {
  const instance = axios.create({
    url: params.url,
    method: params.method,
    data: params.data,
    params: params.params,
    timeout: params.timeout,
  });

  instance.interceptors.request.use(
    (config) => {
      if (params?.isAuth === true) {
        if (getJwtStatus(getAccessToken(params.context)?.toString() ?? '') === 'valid-jwt') {
          // console.log('$$$$$$');
          config.headers = {
            Authorization: 'Gofield ' + getAccessToken(params.context),
          };
        } else {
          // console.log('******');
          config.headers = {
            Authorization: 'Gofield ' + Config().signNotInUserJwt,
          };  
        }
      } else {
        config.headers = {
          Authorization: 'Gofield ' + Config().signNotInUserJwt,
        };
      }
      return config;
    }, 
    (error) => {
      // 요청 에러 처리를 작성합니다.
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async(error: AxiosError<IResponse.CommonResponse<null>, any>) => {
      if (params?.isAuth === true && params.isRefreshApply !== false && isAccessTokenInvalid(error)) {
        const result = await refreshAccessToken(params);
        if (!result) {
          return;    
        }
        return new Promise((resolve, reject) => {
          getAxiosInstance({ ...params, isRefreshApply: false }).then(response => {
            resolve(response);
          }).catch(error => {
            console.error(error);
            // setAxiosGlobalError(error);
            reject(error);
          });
        });
      }

      console.error(error);
      // setAxiosGlobalError(error);
      return Promise.reject(error);
    }
  );

  return instance.request<T>({ url: params.url, data: params.data, params: params.params });
}
import axios, { AxiosError } from "axios";
import useUser from "../use-user-hook/use-user.hook";
import { IAxiosHook } from "./use-axios.hook.interface";
import { useRecoilState } from 'recoil';
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../../atoms/axios.atom";
import { IResponse } from "../../interfaces/response/response.interface";

const useAxios = () => {
  const user = useUser();
  const [axiosGlobalError, setAxiosGlobalError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);

  function getAxiosInstance<T>(params: IAxiosHook.InstanceOptions) {
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
          config.headers = {
            Authorization: 'Bearer ' + user.getAccessToken(),
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
        setAxiosGloballResponse(response);
        return response;
      },
      async(error) => {
        if (params?.isAuth === true && params.isRefreshApply !== false && isAccessTokenInvalid(error)) {
          const result = await refreshAccessToken();
          if (!result) {
            return;    
          }
          return new Promise((resolve, reject) => {
            getAxiosInstance({ ...params, isRefreshApply: false }).then(response => {
              resolve(response);
            }).catch(error => {
              console.error(error);
              setAxiosGlobalError(error);
              reject(error);
            });
          });
        }

        console.error(error);
        setAxiosGlobalError(error);
        return Promise.reject(error);
      }
    );

    return instance.request<T>({ url: params.url, data: params.data, params: params.params });
  }

  function isAccessTokenInvalid(error: AxiosError<IResponse.ErrorResponse>) {
    // access token 이 만료되거나 유효하지 않다는 응답을 체크하는 로직 작성. 만료 & 유효하지 않다는 응답이 맞으면 true, 그렇지 않으면 false 를 반환하도록 작성하면 됨.
    return true;
  }

  function refreshAccessToken() {
    return new Promise<boolean>((resolve, reject) => {
      getAxiosInstance<IResponse.CommonResponse<ILogin.RefreshData>>({ 
        isAuth: true, 
        isRefreshApply: false, 
        // url: Config().api.auth.refresh._,
        url: '',
        method: 'post',
        data: {
          refresh_token: user.getRefreshToken(),
        },
      }).then(response => {
        // user.setAccessToken(response.data.data.accessToken);
        resolve(true);
      }).catch(error => {
        console.error(error);
        setAxiosGlobalError(error);
        resolve(false);
      });
    });
  }

  return {
    getAxiosInstance
  };
};

export default useAxios;
import axios, { AxiosError } from "axios";
import useUser from "../use-user-hook/use-user.hook";
import { IAxiosHook } from "./use-axios.hook.interface";
import { useRecoilState } from 'recoil';
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../../atoms/axios.atom";
import { IResponse } from "../../interfaces/response/response.interface";
import { getJwtStatus } from "../../librarys/jwt-util/jwt-util.library";
import { getRandomToken } from "../../librarys/random-util/random-util.library";
import { globalLoadingDataAtom } from "../../atoms/global-loading-data.atom";

const useAxios = () => {
  const user = useUser();
  const [axiosGlobalError, setAxiosGlobalError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);
  const [globalLoadingData, setGlobalLoadingData] = useRecoilState(globalLoadingDataAtom);

  function getAxiosInstance<T>(params: IAxiosHook.InstanceOptions) {
    const instance = axios.create({
      url: params.url,
      method: params.method,
      data: params.data,
      params: params.params,
      timeout: params.timeout,
    });

    const requestUniqueKey = getRandomToken({ strLength: 20 });

    instance.interceptors.request.use(
      (config) => {
        if (params?.isAuth === true) {
          if (getJwtStatus(user.getAccessToken() ?? '') === 'valid-jwt') {
            config.headers = {
              Authorization: 'Gofield ' + user.getAccessToken(),
            };
          } else {
            config.headers = {
              Authorization: 'Gofield ' + Config().signNotInUserJwt,
            };  
          }
        } else {
          config.headers = {
            Authorization: 'Gofield ' + Config().signNotInUserJwt,
          };
        }
        setGlobalLoadingData(prev => {
          prev.set(requestUniqueKey, config.url ?? '');
          // console.log('prev', prev);
          return new Map(prev);
        });
        return config;
      }, 
      (error) => {
        // ?????? ?????? ????????? ???????????????.
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        setGlobalLoadingData(prev => {
          prev.delete(requestUniqueKey);
          // console.log('prev', prev);
          return new Map(prev);
        });

        setAxiosGloballResponse(response);
        return response;
      },
      async(error: AxiosError<IResponse.CommonResponse<null>, any>) => {
        setGlobalLoadingData(prev => {
          prev.delete(requestUniqueKey);
          // console.log('prev', prev);
          return new Map(prev);
        });

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

  function isAccessTokenInvalid(error: AxiosError<IResponse.CommonResponse<null>>) {
    // access token ??? ??????????????? ???????????? ????????? ????????? ???????????? ?????? ??????. ?????? & ???????????? ????????? ????????? ????????? true, ????????? ????????? false ??? ??????????????? ???????????? ???.
    if (error.response?.data.error?.code === 'U4100') {
      return true;
    }

    return false;
  }

  function refreshAccessToken() {
    return new Promise<boolean>((resolve, reject) => {
      getAxiosInstance<IResponse.CommonResponse<ILogin.RefreshData>>({ 
        isAuth: true, 
        isRefreshApply: false, 
        url: Config().api.auth.refresh._,
        method: 'post',
        data: {
          refreshToken: user.getRefreshToken(),
        },
      }).then(response => {
        user.setAccessToken(response.data.data.accessToken);
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
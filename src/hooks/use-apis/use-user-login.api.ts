import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserLoginApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((code: string, social: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ILogin.LoginData>>({
      url: Config().api.auth.login._,
      method: 'post',
      data: {
        code,
        state: '',
        social,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserLoginApi;
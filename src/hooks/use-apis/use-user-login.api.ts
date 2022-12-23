import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserLoginApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((code: string, state: string, social: string) => {
    let environment: IOrder.Environment = 'PROD';
    if (Config().mode === 'development') {
      environment = 'DEV';
    } else if (Config().mode === 'local') {
      environment = 'LOCAL';
    }

    return axios.getAxiosInstance<IResponse.CommonResponse<ILogin.LoginData>>({
      url: Config().api.auth.login._,
      method: 'post',
      data: {
        code,
        state,
        social,
        environment,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserLoginApi;
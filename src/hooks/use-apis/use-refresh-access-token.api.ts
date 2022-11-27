import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";
import useUser from "../use-user-hook/use-user.hook";

const useRefreshAccessTokenApi = () => {
  const axios = useAxios();
  const user = useUser();

  const start = useCallback((callback: (result: boolean) => void) => {
    axios.getAxiosInstance<IResponse.CommonResponse<ILogin.RefreshData>>({ 
      isAuth: true, 
      isRefreshApply: false, 
      url: Config().api.auth.refresh._,
      method: 'post',
      data: {
        refreshToken: user.getRefreshToken(),
      },
    }).then(response => {
      user.setAccessToken(response.data.data.accessToken);
      callback(true);
    }).catch(error => {
      console.error(error);
      callback(false);
    });
  }, [axios, user]);

  return {
    start,
  };
};

export default useRefreshAccessTokenApi;
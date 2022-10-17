import { useCallback, useEffect, useState } from "react";
import Config from "../../configs/config.export";
import { ICommon } from "../../interfaces/common/common.interface";
import { ILogin } from "../../interfaces/login/login.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";
import useUser from "../use-user-hook/use-user.hook";

// Domain 값을 가져오는 api hook sample
export const useSampleValueItems = () => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([]);

  const axios = useAxios();
  
  useEffect(() => {
    // axios.getAxiosInstance<any>({
    //   url: '',
    //   method: 'post',
    //   data: {},
    // }).then(response => {
    //   const codeList: { code: string; name: string; }[] = response.data.codeList;
    //   setValueItems(codeList.map(x => ({ text: x.name, value: x.code })));
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return valueItems;
};

export const useUserLogin = () => {
  const axios = useAxios();

  const getInstance = useCallback((code: string, state: string, social: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ILogin.LoginData>>({
      url: Config().api.auth.login._,
      method: 'post',
      data: {
        code,
        state,
        social,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export const useRefreshAccessToken = () => {
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

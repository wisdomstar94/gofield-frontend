import { useCallback, useEffect, useState } from "react";
import Config from "../../configs/config.export";
import { ICode } from "../../interfaces/code/code.interface";
import { ICommon } from "../../interfaces/common/common.interface";
import { ILogin } from "../../interfaces/login/login.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISignup } from "../../interfaces/signup/signup.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import useAxios from "../use-axios-hook/use-axios.hook";
import useUser from "../use-user-hook/use-user.hook";

// code list
export const useCategoryValueItems = () => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([]);
  const axios = useAxios();
  
  useEffect(() => {
    axios.getAxiosInstance<IResponse.CommonResponse<ICode.CodeItem[]>>({
      url: Config().api.user.category._,
      method: 'get',
      isAuth: true,
      data: {},
    }).then(response => {
      const codeList = response.data.data;
      setValueItems(codeList.map(x => ({ text: x.name, value: x.id + '' })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return valueItems;
};









/*
  auth-controller
*/
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

export const useUserSignup = () => {
  const axios = useAxios();

  const getInstance = useCallback((detailInfo: ISignup.SingupDetailInfo) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ISignup.SignupApiData>>({
      url: Config().api.auth.signup._,
      method: 'post',
      data: {
        agreeList: detailInfo.agreeList,
        categoryList: detailInfo.categoryList,
        selectionList: detailInfo.selectionList,
        email: detailInfo.email,
        height: Number(detailInfo.height),
        weight: Number(detailInfo.weight),
      },
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};













/*
  User Controller
*/
export const useTermList = () => {
  const axios = useAxios();

  const getInstance = useCallback((termType: ITerms.TermType) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ITerms.TermItem[]>>({
      url: Config().api.user.term._,
      method: 'get',
      params: {
        type: termType,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};
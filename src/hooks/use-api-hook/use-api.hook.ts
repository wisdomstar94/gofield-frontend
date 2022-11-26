import { useCallback, useEffect, useState } from "react";
import Config from "../../configs/config.export";
import { IBanner } from "../../interfaces/banner/banner.interface";
import { ICode } from "../../interfaces/code/code.interface";
import { ICommon } from "../../interfaces/common/common.interface";
import { ILogin } from "../../interfaces/login/login.interface";
import { IMain } from "../../interfaces/main/main.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISignup } from "../../interfaces/signup/signup.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import useAxios from "../use-axios-hook/use-axios.hook";
import useUser from "../use-user-hook/use-user.hook";

// code list
// export const useCategoryValueItems = () => {
//   const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([]);
//   const axios = useAxios();
  
//   useEffect(() => {
//     axios.getAxiosInstance<IResponse.CommonResponse<ICode.CodeItem[]>>({
//       url: Config().api.user.category._,
//       method: 'get',
//       isAuth: true,
//       data: {},
//     }).then(response => {
//       const codeList = response.data.data;
//       setValueItems(codeList.map(x => ({ text: x.name, value: x.id + '' })));
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return valueItems;
// };

export const useExchangeReturnReasonValueItems = () => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([
    { text: '상품이 마음에 들지 않음 (단순변심)', value: '1' },
    { text: '상품이 문제 있음 (불량)', value: '2' },
    { text: '상품이 설명과 다름', value: '3' },
    { text: '상품이 누락됨', value: '4' },
    { text: '다른 상품이 배송됨', value: '5' },
    { text: '다른 주소로 배송됨', value: '6' },
  ]);

  return valueItems;
};

export const useProductCategoryValueItems = () => {
  const [valueItems, setValueItems] = useState<ICommon.ValueItem[]>([
    { text: '골프', value: 'golf' },
    { text: '자전거', value: 'bicycle' },
    { text: '헬스', value: 'health' },
    { text: '등산', value: 'mountain' },
    { text: '테니스', value: 'tennis' },
    { text: '축구', value: 'soccer' },
    { text: '야구', value: 'baseball' },
    { text: '수영', value: 'swimming' },
    { text: '의류', value: 'clothing' },
    { text: '기타', value: 'etc' },
  ]);

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
  Main Controller
*/
export const useErrorApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ITerms.TermItem[]>>({
      url: Config().api.main.error._,
      method: 'get',
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export const useMainBannerList = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IBanner.BannerListApiData[]>>({
      url: Config().api.main.banner._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export const useMainItemList = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IMain.MainItemApiData>>({
      url: Config().api.main.item._,
      method: 'get',
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

/**
 * @description /api/user/{version}/term 이용약관 리스트 조회
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
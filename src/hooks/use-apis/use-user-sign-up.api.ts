import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISignup } from "../../interfaces/signup/signup.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserSignupApi = () => {
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

export default useUserSignupApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import { IUser } from "../../interfaces/user/user.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserPhoneNumberCertNumberCheckApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((detailInfo: IUser.PhoneNumberChangeDetailInfo) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IUser.ProfileApiData>>({
      url: Config().api.user.sms._,
      method: 'put',
      data: {
        code: detailInfo.certNumber,
      },
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserPhoneNumberCertNumberCheckApi;
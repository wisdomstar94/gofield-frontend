import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IAccount } from "../../interfaces/account/account.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserRefundAccountApi = () => {
  const axios = useAxios();
  
  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IAccount.RefundAccountInfoApiData>>({
      url: Config().api.user.account._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserRefundAccountApi;
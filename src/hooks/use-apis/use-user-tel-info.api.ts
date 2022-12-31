import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import { IUser } from "../../interfaces/user/user.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserTelInfoApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IUser.TelInfo>>({
      url: Config().api.user.tel._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserTelInfoApi;
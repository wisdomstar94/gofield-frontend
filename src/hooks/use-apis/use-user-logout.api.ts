import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserLogoutApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.auth.logout._,
      method: 'post',
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserLogoutApi;
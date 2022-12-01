import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserSignOutApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.user.withdraw._,
      method: 'delete',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserSignOutApi;
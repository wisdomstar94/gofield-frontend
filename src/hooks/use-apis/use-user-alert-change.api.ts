import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserAlertChangeApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((isAlertPromotion: boolean) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.user.alert._,
      method: 'put',
      data: {
        isAlertPromotion: isAlertPromotion,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserAlertChangeApi;
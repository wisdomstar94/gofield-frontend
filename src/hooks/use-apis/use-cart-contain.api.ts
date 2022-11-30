import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCartContainApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((isNow: boolean, itemNumber: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.cart._,
      method: 'post',
      isAuth: true,
      data: {
        isNow,
        itemNumber,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCartContainApi;
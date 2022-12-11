import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICode } from "../../interfaces/code/code.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCodeOrderShippingStatusListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ICode.CodeItem[]>>({
      url: Config().api.code.code._,
      method: 'get',
      isAuth: true,
      params: {
        group: 'ORDER_SHIPPING_STATUS',
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCodeOrderShippingStatusListApi;
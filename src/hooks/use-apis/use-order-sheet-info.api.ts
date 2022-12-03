import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderSheetInfoApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((orderCode: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderSheetInfo>>({
      url: Config().api.order.sheet._ + '/' + orderCode,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderSheetInfoApi;
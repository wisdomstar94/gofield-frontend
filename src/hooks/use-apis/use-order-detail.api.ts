import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((orderNumber: string | number) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderDetailInfo>>({
      url: Config().api.order._ + '/' + orderNumber,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderDetailApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderListApiData>>({
      url: Config().api.order._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderListApi;
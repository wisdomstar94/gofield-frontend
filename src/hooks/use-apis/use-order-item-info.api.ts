import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderItemInfoApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((orderNumber: string, orderItemId: string | number) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderShippingOrderItem>>({
      url: Config().api.order.item.orderItem(orderNumber, orderItemId),
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderItemInfoApi;
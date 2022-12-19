import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderItemCancelDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((orderItemId: string | number, reason: IOrder.OrderCancelReasonEnum) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderItemCancelDetailInfo>>({
      url: Config().api.order.item._ + '/' + orderItemId,
      method: 'get',
      isAuth: true,
      params: {
        reason,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderItemCancelDetailApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IExchangeReturn } from "../../interfaces/exchange-return/exchange-return.interface";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderCancelExchangeReturnDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((targetId: string | number) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IExchangeReturn.OrderCancelExchangeReturnDetailInfo>>({
      url: Config().api.order._ + '/cancel/' + targetId,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderCancelExchangeReturnDetailApi;
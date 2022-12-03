import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderPaymentApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((detailInfo: IOrder.OrderFormDetailInfo) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderPaymentApiData>>({
      url: Config().api.order.payment._,
      method: 'post',
      isAuth: true,
      data: detailInfo,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderPaymentApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderSheetCreateApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((params: {
    items: IOrder.OrderSheetItem[]; 
    totalDelivery: number;
    totalPrice: number;
    isCart: boolean;
  }) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderSheetCreateApiData>>({
      url: Config().api.order.sheet._,
      method: 'post',
      isAuth: true,
      data: {
        items: params.items, 
        isCart: params.isCart,
        totalDelivery: params.totalDelivery,
        totalPrice: params.totalPrice,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderSheetCreateApi;
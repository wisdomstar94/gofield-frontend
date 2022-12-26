import { useCallback } from "react";
import { ICancelReturnExchangeRowItem } from "../../components/forms/cancel-return-exchange-row-item/cancel-return-exchange-row-item.interface";
import Config from "../../configs/config.export";
import { IExchangeReturn } from "../../interfaces/exchange-return/exchange-return.interface";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderCancelExchangeReturnListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IExchangeReturn.CancelExchangeReturnListApiData>>({
      url: Config().api.order._ + '/cancel' + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderCancelExchangeReturnListApi;
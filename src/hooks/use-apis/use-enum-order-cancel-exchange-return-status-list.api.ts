import { useCallback } from "react";
import { ICancelReturnExchangeRowItem } from "../../components/forms/cancel-return-exchange-row-item/cancel-return-exchange-row-item.interface";
import Config from "../../configs/config.export";
import { IEnum } from "../../interfaces/enum/enum.interface";
import { IExchangeReturn } from "../../interfaces/exchange-return/exchange-return.interface";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useEnumOrderCancelExchangeReturnStatusListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IEnum.EnumItem[]>>({
      url: Config().api.enum._ + '/ORDER_CANCEL_STATUS',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useEnumOrderCancelExchangeReturnStatusListApi;
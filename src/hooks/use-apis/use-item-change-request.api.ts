import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IExchangeReturn } from "../../interfaces/exchange-return/exchange-return.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemChangeRequestApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((form: IExchangeReturn.ExchangeReturnForm) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.order._ + '/change/' + form.orderItemId,
      method: 'post',
      isAuth: true,
      data: {
        address: form.shippingAddress?.address,
        addressExtra: form.shippingAddress?.addressExtra,
        content: form.exchangeDetailContent,
        reason: form.reason,
        userTel: form.shippingAddress?.tel,
        username: form.shippingAddress?.name,
        zipCode: form.shippingAddress?.zipCode,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemChangeRequestApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICart } from "../../interfaces/cart/cart.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCartCountApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ICart.CartCountApiData>>({
      url: Config().api.cart._ + '/count',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCartCountApi;
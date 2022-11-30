import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICart } from "../../interfaces/cart/cart.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCartItemDeleteApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((cartId: number | string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.cart._ + '/' + cartId,
      method: 'delete',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCartItemDeleteApi;
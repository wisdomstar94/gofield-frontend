import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICart } from "../../interfaces/cart/cart.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCartListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ICart.CartItem[]>>({
      url: Config().api.cart._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCartListApi;
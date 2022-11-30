import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IAddress } from "../../interfaces/address/address.interface";
import { ICart } from "../../interfaces/cart/cart.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserAddressListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IAddress.AddressItem[]>>({
      url: Config().api.user.address._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserAddressListApi;
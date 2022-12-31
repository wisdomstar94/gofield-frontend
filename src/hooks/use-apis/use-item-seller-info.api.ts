import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISeller } from "../../interfaces/seller/seller.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemSellerInfoApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemNumber: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ISeller.SellerInfoApiData>>({
      url: Config().api.item._ + '/' + itemNumber + '/seller',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemSellerInfoApi;
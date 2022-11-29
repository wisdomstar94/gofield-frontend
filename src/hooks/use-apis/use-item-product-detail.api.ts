import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemProductDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemNumber: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.ItemDetailInfoApiData>>({
      url: Config().api.item._ + '/' + itemNumber,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemProductDetailApi;
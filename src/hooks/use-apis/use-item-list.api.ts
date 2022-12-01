import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.ProductRowItem[]>>({
      url: Config().api.item._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemListApi;
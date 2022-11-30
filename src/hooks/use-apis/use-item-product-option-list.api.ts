import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemProductOptionListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemId: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.ProductOptionGroupListApiData>>({
      url: Config().api.item._ + '/' + itemId + '/option',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemProductOptionListApi;
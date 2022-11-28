import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICode } from "../../interfaces/code/code.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemBundleProductDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((bundleId: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.BundleProductDetailApiData>>({
      url: Config().api.item.bundle._ + '/' + bundleId,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemBundleProductDetailApi;
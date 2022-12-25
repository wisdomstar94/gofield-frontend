import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IBundle } from "../../interfaces/bundle/bundle.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useBundleItemListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((bundleId: string, queryString: string) => {
    if (queryString === undefined) queryString = '';
    return axios.getAxiosInstance<IResponse.CommonResponse<IBundle.BundleItemListApiData>>({
      url: Config().api.item.bundle._ + '/' + bundleId + '/item' + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useBundleItemListApi;
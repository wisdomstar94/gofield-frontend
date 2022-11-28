import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemBundleProductReviewListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((bundleId: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.ReviewItem[]>>({
      url: Config().api.item.bundle._ + '/' + bundleId + '/review',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemBundleProductReviewListApi;
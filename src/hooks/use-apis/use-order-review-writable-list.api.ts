import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { IReview } from "../../interfaces/review/review.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderReviewWritableListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IReview.ReviewWritableListApiData>>({
      url: Config().api.order.review.item._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderReviewWritableListApi;
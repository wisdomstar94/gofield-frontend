import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { IReview } from "../../interfaces/review/review.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderReviewWriteApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((data: IReview.ReviewFormInfo) => {
    const formData = new FormData();

    const review = {
      weight: data.weight,
      height: data.height,
      reviewScore: data.reviewScore,
      content: data.content,
    };
    formData.append('review', new Blob([JSON.stringify(review)],{ type: "application/json" }));
    if (data.imageFileItems !== undefined && data.imageFileItems.length > 0) {
      data.imageFileItems.forEach((item) => {
        if (item.file) {
          formData.append('images', item.file);
        }
      });
    } 

    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.order.review.write(data?.orderItemId ?? ''),
      method: 'post',
      isAuth: true,
      data: formData,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderReviewWriteApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { IReview } from "../../interfaces/review/review.interface";
import useAxios from "../use-axios-hook/use-axios.hook";
import useModalAlert from "../use-modals/use-modal-alert.modal";

const useOrderReviewWriteApi = () => {
  const axios = useAxios();
  const modalAlert = useModalAlert();

  const getInstance = useCallback((data: IReview.ReviewFormInfo) => {
    const formData = new FormData();

    // if (data.reviewScore === undefined) {
    //   modalAlert.show({ title: '안내', content: '리뷰 점수를 확인 할 수 없습니다.' });
    //   return;
    // }

    // if (data.content === undefined) {
    //   modalAlert.show({ title: '안내', content: '리뷰 내용을 확인 할 수 없습니다.' });
    //   return;
    // }

    const review: IReview.ReviewWriteForm = {
      reviewScore: data.reviewScore ?? 5,
      content: data.content ?? '',
    };
    if (data.weight !== undefined) {
      review.weight = Number(data.weight);
    }
    if (data.height !== undefined) {
      review.height = Number(data.height);
    }

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
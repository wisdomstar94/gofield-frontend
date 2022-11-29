import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IQna } from "../../interfaces/qna/qna.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemProductQnaUploadApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemId: string, qnaForm: IQna.QnaForm) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IItem.ItemDetailInfoApiData>>({
      url: Config().api.item._ + '/' + itemId + '/qna',
      method: 'post',
      isAuth: true,
      data: {
        description: qnaForm.description,
        isVisible: qnaForm.isVisible,
        title: qnaForm.title,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemProductQnaUploadApi;
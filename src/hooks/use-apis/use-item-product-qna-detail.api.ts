import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IQna } from "../../interfaces/qna/qna.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemProductQnaDetailApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemId: string, qnaId: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IQna.QnaDetailInfoApiData>>({
      url: Config().api.item._ + '/' + itemId + '/qna/' + qnaId,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemProductQnaDetailApi;
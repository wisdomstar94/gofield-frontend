import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IQna } from "../../interfaces/qna/qna.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemProductQnaListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemId: string, queryString?: string) => {
    if (queryString === undefined) queryString = '';
    return axios.getAxiosInstance<IResponse.CommonResponse<IQna.QnaListApiData>>({
      url: Config().api.item._ + '/' + itemId + '/qna' + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemProductQnaListApi;
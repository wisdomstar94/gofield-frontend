import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISearch } from "../../interfaces/search/search.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useSearchRecommendKeywordListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ISearch.KeywordItem[]>>({
      url: Config().api.search.keyword._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useSearchRecommendKeywordListApi;
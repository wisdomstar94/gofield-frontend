import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IItem } from "../../interfaces/item/item.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import { ISearch } from "../../interfaces/search/search.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useSearchListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ISearch.SearchListApiData>>({
      url: Config().api.search._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useSearchListApi;
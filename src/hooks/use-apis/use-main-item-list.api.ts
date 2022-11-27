import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IMain } from "../../interfaces/main/main.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useMainItemListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IMain.MainItemApiData>>({
      url: Config().api.main.item._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useMainItemListApi;
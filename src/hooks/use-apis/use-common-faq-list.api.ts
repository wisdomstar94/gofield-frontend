import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IFaq } from "../../interfaces/faq/faq.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCommonFaqListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IFaq.FaqListApiData>>({
      url: Config().api.common.faq._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCommonFaqListApi;
import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useErrorApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ITerms.TermItem[]>>({
      url: Config().api.main.error._,
      method: 'get',
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useErrorApi;


import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useTermListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((termType: ITerms.TermType) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ITerms.TermItem[]>>({
      url: Config().api.user.term._,
      method: 'get',
      params: {
        type: termType,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useTermListApi;
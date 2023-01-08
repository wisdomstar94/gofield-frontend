import { useCallback } from "react";
import Config from "../../configs/config.export";
import { ICode } from "../../interfaces/code/code.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCodeSubCategoryListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((categoryId: string | number) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<ICode.CategoryCodeItem[]>>({
      url: Config().api.common.category._ + '/' + categoryId,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCodeSubCategoryListApi;
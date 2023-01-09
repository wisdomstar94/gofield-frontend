import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IEnum } from "../../interfaces/enum/enum.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useEnumNoticeTypeListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IEnum.EnumItem[]>>({
      url: Config().api.enum._ + '/NOTICE_TYPE',
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useEnumNoticeTypeListApi;
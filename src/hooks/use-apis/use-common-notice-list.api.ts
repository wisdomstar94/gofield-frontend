import { useCallback } from "react";
import Config from "../../configs/config.export";
import { INotice } from "../../interfaces/notice/notice.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useCommonNoticeListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((queryString: string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<INotice.NoticeListApiData>>({
      url: Config().api.common.notice._ + queryString,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useCommonNoticeListApi;
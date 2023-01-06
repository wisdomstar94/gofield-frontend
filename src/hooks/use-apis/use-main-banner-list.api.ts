import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IBanner } from "../../interfaces/banner/banner.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useMainBannerListApi = () => {
  const axios = useAxios();

  const getInstance = useCallback(() => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IBanner.BannerListApiData>>({
      url: Config().api.main.banner._,
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useMainBannerListApi;
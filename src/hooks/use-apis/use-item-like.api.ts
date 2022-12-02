import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useItemLikeApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((itemId: number, isLike: boolean) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.item.like._ + '/' + itemId,
      method: 'post',
      isAuth: true,
      data: {
        isLike,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useItemLikeApi;
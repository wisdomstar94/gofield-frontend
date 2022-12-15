import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IOrder } from "../../interfaces/order/order.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useOrderCarrierTrack = () => {
  const axios = useAxios();

  const getInstance = useCallback((carrierId: number | string, trackId: number | string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<IOrder.OrderCarrierTrackApiData>>({
      url: Config().api.order.carrier.track._(carrierId, trackId),
      method: 'get',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useOrderCarrierTrack;
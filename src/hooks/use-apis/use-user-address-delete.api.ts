import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserAddressDeleteApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((addressId: number | string) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.user.address._ + '/' + addressId,
      method: 'delete',
      isAuth: true,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserAddressDeleteApi;
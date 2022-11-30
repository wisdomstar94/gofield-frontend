import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IAddress } from "../../interfaces/address/address.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserAddressEditApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((addressForm: IAddress.AddressForm) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.user.address._ + '/' + addressForm.id,
      method: 'put',
      isAuth: true,
      data: addressForm,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserAddressEditApi;
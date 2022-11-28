import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IAccount } from "../../interfaces/account/account.interface";
import { IResponse } from "../../interfaces/response/response.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserRefundAccountUpdateApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((detailInfo: IAccount.RefundAccountDetailInfo) => {
    return axios.getAxiosInstance<IResponse.CommonResponse<null>>({
      url: Config().api.user.account._,
      method: 'put',
      isAuth: true,
      data: {
        agreeList: [ detailInfo.privacyTermAgree === true ? 15 : -999 ],
        bankAccountNumber: detailInfo.accountNumber,
        bankCode: detailInfo.bankValueItem?.value,
        bankHolderName: detailInfo.accountHolderName,
        bankName: detailInfo.bankValueItem?.text,
      },
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserRefundAccountUpdateApi;
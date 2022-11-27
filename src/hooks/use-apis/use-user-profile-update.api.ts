import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IResponse } from "../../interfaces/response/response.interface";
import { ITerms } from "../../interfaces/terms/terms.interface";
import { IUser } from "../../interfaces/user/user.interface";
import useAxios from "../use-axios-hook/use-axios.hook";

const useUserProfileUpdateApi = () => {
  const axios = useAxios();

  const getInstance = useCallback((profileDetailInfo: IUser.ProfileDetailInfo) => {
    const user = {
      name: profileDetailInfo.name,
      nickName: profileDetailInfo.profileName,
      weight: profileDetailInfo.weight,
      height: profileDetailInfo.height,
    };

    const formData = new FormData();
    if (profileDetailInfo.thumbnailFileInfo?.file !== undefined && profileDetailInfo.thumbnailFileInfo?.file !== null) {
      formData.append('image', profileDetailInfo.thumbnailFileInfo?.file);
    }
    formData.append('user', new Blob([JSON.stringify(user)],{ type: "application/json" }));

    return axios.getAxiosInstance<IResponse.CommonResponse<IUser.ProfileApiData>>({
      url: Config().api.user.profile._,
      method: 'put',
      isAuth: true,
      data: formData,
    });
  }, [axios]);

  return {
    getInstance,
  };
};

export default useUserProfileUpdateApi;
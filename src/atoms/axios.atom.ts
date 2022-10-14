import { AxiosError, AxiosResponse } from "axios";
import { atom } from "recoil";
import { IResponse } from "../interfaces/response/response.interface";

export const axiosGloballErrorAtom = atom({
  key: 'axiosGloballError',
  default: null as null | AxiosError<IResponse.ErrorResponse>,
});

export const axiosGlobalResponseAtom = atom({
  key: 'axiosGlobalResponse',
  default: null as null | AxiosResponse<IResponse.CommonResponse<unknown>>,
});



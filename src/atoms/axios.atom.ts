import { AxiosError, AxiosResponse } from "axios";
import { atom } from "recoil";
import { IResponse } from "../interfaces/response/response.interface";
import { v1 } from "uuid";

export const axiosGloballErrorAtom = atom({
  key: `axiosGloballError${v1()}`,
  default: null as null | AxiosError<IResponse.CommonResponse<null>>,
});

export const axiosGlobalResponseAtom = atom({
  key: `axiosGlobalResponse${v1()}`,
  default: null as null | AxiosResponse<IResponse.CommonResponse<unknown>>,
});



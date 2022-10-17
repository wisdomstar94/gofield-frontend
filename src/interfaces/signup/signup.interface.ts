import { ITerms } from "../terms/terms.interface";

export declare namespace ISignup {
  export interface SingupDetailInfo {
    weight: string;
    height: string;
    email: string;
    agreeList: number[];
    categoryList: number[];
    // disAgreeList: number[];
    selectionList: ITerms.TermSelectionType[];
  }

  export interface SignupApiData {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: 'Gofield';
    refreshToken: string;
    refreshTokenExpiresIn: number;
  }
}
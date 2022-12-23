export declare namespace ILogin {
  export type SocialType = 'KAKAO' | 'NAVER';

  export interface LoginData {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: 'Gofield',
    isSign: boolean;
    refreshToken: string;
    refreshTokenExpiresIn: number;
  }

  export interface RefreshData {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: 'Gofield',
    refreshToken: string;
    refreshTokenExpiresIn: number;
  }

  export interface JwtPayload {
    iss: string;
    gti: string;
    jti: string;
    exp: number;
    isSign: boolean;
    social: SocialType;
  }
}
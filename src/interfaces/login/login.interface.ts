export declare namespace ILogin {
  export interface LoginData {
    accessToken: string;
    accessTokenExpiresIn: number;
    grantType: 'Gofield',
    isFirst: boolean;
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
    isFirst: boolean;
    social: 'KAKAO' | 'NAVER';
  }
}
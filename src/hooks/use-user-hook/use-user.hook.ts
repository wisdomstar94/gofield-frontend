import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { getJwtPayload, getJwtStatus } from "../../librarys/jwt-util/jwt-util.library";

const useUser = () => {
  // const axios = useAxios();
  const ACCESS_TOKEN = 'access_token';
  const REFRESH_TOKEN = 'refresh_token';

  function removeAll(): void {
    removeAccessToken();
    removeRefreshToken();
  }
  


  function isLogined() {
    const accessToken = getAccessToken();
    
    if (accessToken === null || accessToken === undefined) {
      return false;
    }
    
    if (accessToken.trim() === '') {
      return false;
    }

    if (getJwtStatus(accessToken) === 'not-jwt-structure') {
      return false;
    }

    return true;
  }


  function getLoginRequestUrl(socialType: ILogin.SocialType) {
    let environment = '';
    switch (Config().mode) {
      case 'local': environment = 'LOCAL'; break;
      case 'development': environment = 'DEV'; break;
      case 'production': environment = 'PROD'; break;
    }
    if (environment === '') {
      alert('유효하지 않은 요청입니다.');
      return;
    }

    const url = Config().api.third.ready._ + `?environment=${environment}&social=${socialType}`;
    return url;
  }



  function setAccessToken(token: string): void {
    setCookie('access_token', token, { maxAge: 60 * 1440 * 4 });
    // localStorage.setItem(ACCESS_TOKEN, token);
  }

  function getAccessToken(): string | null | undefined {
    const value = getCookie('access_token');
    if (typeof value === 'boolean') {
      return null;
    }
    return value;
    // return localStorage.getItem(ACCESS_TOKEN);
  }

  function removeAccessToken(): void {
    // localStorage.removeItem(ACCESS_TOKEN);
    deleteCookie('access_token');
  }



  function getAccessTokenPayload() {
    const accessToken = getAccessToken();
    if (accessToken === null || accessToken === undefined) {
      return null;
    }
    const payload = getJwtPayload<ILogin.JwtPayload>(accessToken);
    return payload;
  }



  function setRefreshToken(token: string): void {
    setCookie('refresh_token', token, { maxAge: 60 * 1440 * 4 });
    // localStorage.setItem(REFRESH_TOKEN, token);
  }

  function getRefreshToken(): string | null | undefined {
    const value = getCookie('refresh_token');
    if (typeof value === 'boolean') {
      return null;
    }
    return value;
    // return localStorage.getItem(REFRESH_TOKEN);
  }

  function removeRefreshToken(): void {
    // localStorage.removeItem(REFRESH_TOKEN);
    deleteCookie('refresh_token');
  }

  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    removeAll,
    getAccessTokenPayload,
    isLogined,
    getLoginRequestUrl,
  };
};

export default useUser;
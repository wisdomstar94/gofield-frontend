import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import { getJwtPayload, getJwtStatus } from "../../librarys/jwt-util/jwt-util.library";

const useUser = () => {
  // const axios = useAxios();
  const ACCESS_TOKEN = 'accessToken';
  const REFRESH_TOKEN = 'refreshToken';

  function removeAll(): void {
    removeAccessToken();
    removeRefreshToken();
  }
  


  function isLogined() {
    const accessToken = getAccessToken();
    
    if (accessToken === null) {
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
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  function removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }



  function getAccessTokenPayload() {
    const accessToken = getAccessToken();
    if (accessToken === null) {
      return null;
    }
    const payload = getJwtPayload<ILogin.JwtPayload>(accessToken);
    return payload;
  }



  function setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  function removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN);
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
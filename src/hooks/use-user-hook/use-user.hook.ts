import { ILogin } from "../../interfaces/login/login.interface";
import { getJwtPayload } from "../../librarys/jwt-util/jwt-util.library";

const useUser = () => {
  // const axios = useAxios();
  const ACCESS_TOKEN = 'accessToken';
  const REFRESH_TOKEN = 'refreshToken';

  function removeAll(): void {
    removeAccessToken();
    removeRefreshToken();
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
  };
};

export default useUser;
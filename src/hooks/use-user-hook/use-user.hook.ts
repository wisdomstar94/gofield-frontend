const useUser = () => {
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
  };
};

export default useUser;
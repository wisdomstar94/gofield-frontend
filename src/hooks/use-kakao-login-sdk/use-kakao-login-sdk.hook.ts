import { useCallback } from "react";
import Config from "../../configs/config.export";
import { IKakao } from "../../interfaces/kakao/kakao.interface";

const useKakaoLoginSdk = () => {
  const init = useCallback(() => {
    if ((window as any)?.Kakao?.isInitialized() === true) {
      return;
    }

    const javascriptKey = Config().kakao.sdk.javascriptKey;
    (window as any)?.Kakao?.init(javascriptKey);
  }, []);

  const getCookie = useCallback((name: string) => {
    const parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }, []);

  const kakaoLoginStart = useCallback((options: IKakao.LoginOption) => {
    (window as any).Kakao.Auth.authorize(options);
  }, []);

  const displayToken = useCallback(() => {
    const token = getCookie('authorize-access-token');

    if ((window as any).Kakao === undefined) {
      return;
    }

    if (token) {
      (window as any).Kakao.Auth.setAccessToken(token);
      (window as any).Kakao.Auth.getStatusInfo()
        .then(function(res: any) {
          if (res.status === 'connected') {
            // console.log('login success, token: ' + (window as any).Auth.getAccessToken());
          }
        })
        .catch(function(err: any) {
          (window as any).Auth.setAccessToken(null);
        });
    }
  }, [getCookie]);

  return {
    init,
    getCookie,
    kakaoLoginStart,
    displayToken,
  };
};

export default useKakaoLoginSdk;

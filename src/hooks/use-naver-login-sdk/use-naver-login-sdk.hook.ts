import { useCallback, useRef } from "react";
import { INaver } from "../../interfaces/naver/naver.interface";

const useNaverLoginSdk = () => {
  const isInitRef = useRef(false);
  const clientIdRef = useRef<string>();
  const callbackUrlRef = useRef<string>();
  const stateRef = useRef<string>();
  const naverIdLoginRef = useRef<any>();

  // 네이버 sdk 에서 DOM 에 있는 id 가 "naver_id_login" 요소에 클릭 이벤트를 할당해주는 구조입니다.
  // 그렇기 때문에 DOM 에 id 가 "naver_id_login" 인 요소가 존재해야 합니다.
  const init = useCallback((initOptions: INaver.InitOptions) => {
    if (isInitRef.current) {
      return;
    }
    clientIdRef.current = initOptions.clientId;
    callbackUrlRef.current = initOptions.callbackUrl;
    const naver_id_login = new (window as any).naver_id_login(initOptions.clientId, initOptions.callbackUrl);
    naverIdLoginRef.current = naver_id_login;
    const state = naver_id_login.getUniqState();
    stateRef.current = state;
    // naver_id_login.setButton("white", 2,40);
    // naver_id_login.setDomain("YOUR_SERVICE_URL");
    naver_id_login.setState(state);
    naver_id_login.setPopup();
    naver_id_login.init_naver_id_login();
    isInitRef.current = true;
  }, []);

  const naverLoginStart = useCallback(() => {
    const url = 'https://nid.naver.com/oauth2.0/authorize'
      .concat('?response_type=', 'token')
      .concat('&client_id=', clientIdRef.current + '')
      .concat('&redirect_uri=', callbackUrlRef.current + '')
      .concat('&state=', stateRef.current + '')
    ;
    
    // alert(url);

    // window.open(url, 'naverloginpop', 'titlebar=1, resizable=1, scrollbars=yes, width=900, height=550');
    location.href = url;
  }, []);

  const getNaverAuthParams = useCallback(() => {
    console.log('naverIdLoginRef', naverIdLoginRef);

    if (naverIdLoginRef.current === undefined) {
      return;
    }

    return naverIdLoginRef.current?.oauthParams as INaver.OauthParams;
  }, []);

  return {
    init,
    naverLoginStart,
    getNaverAuthParams,
  };
};

export default useNaverLoginSdk;

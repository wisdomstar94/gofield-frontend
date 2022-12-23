import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const signNotInUserJwt = process.env.NEXT_PUBLIC_SIGN_NOT_IN_USER_JWT ?? '';
const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL ?? '';
const mode = 'local';
const apiVersion = 'v1';
const kakaoSdkJavascriptUrl = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js';
const kakaoSdkJavascriptIntegrity = 'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx';
const kakaoSdkJavascriptCrossOrigin = 'anonymous';
const kakaoJavascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY ?? '';
const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? '';

const configLocal = getConfigs({
  baseUrl,
  signNotInUserJwt,
  redirectUrl,
  mode,
  apiVersion,
  kakaoSdkJavascriptUrl,
  kakaoSdkJavascriptIntegrity,
  kakaoSdkJavascriptCrossOrigin,
  kakaoJavascriptKey,
  naverClientId,
});

export default configLocal;

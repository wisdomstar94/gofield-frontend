import { NextPage } from "next";
import styles from './index.module.scss';
import Head from "next/head";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import SvgGofieldLogo from "../../components/svgs/svg-gofield-logo/svg-gofield-logo.component";
import List, { ListItem } from "../../components/layouts/list/list.component";
import SvgSocialSymbolKakao from "../../components/svgs/svg-social-symbol-kakao/svg-social-symbol-kakao.component";
import SvgSocialSymbolNaver from "../../components/svgs/svg-social-symbol-naver/svg-social-symbol-naver.component";
import { useCallback, useEffect, useRef } from "react";
import Config from "../../configs/config.export";
import { ILogin } from "../../interfaces/login/login.interface";
import Script from "next/script";
import { useRouter } from "next/router";
import useKakaoLoginSdk from "../../hooks/use-kakao-login-sdk/use-kakao-login-sdk.hook";
import useNaverLoginSdk from "../../hooks/use-naver-login-sdk/use-naver-login-sdk.hook";
import useUser from "../../hooks/use-user-hook/use-user.hook";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 로그인</title>
        <meta name="description" content="고필드 로그인 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <PageContents />
    </>
  );
};  

const PageContents = () => {
  const router = useRouter();
  const kakaoLoginSdk = useKakaoLoginSdk();
  const naverLoginSdk = useNaverLoginSdk();
  const user = useUser();

  const socialLoginButtonClick = useCallback((socialType: ILogin.SocialType) => {
    if (socialType === 'KAKAO') {
      kakaoLoginSdk.kakaoLoginStart({
        redirectUri: Config().kakao.redirectUrl,
      });
      return;
    }

    if (socialType === 'NAVER') {
      naverLoginSdk.naverLoginStart();
      return;
    }
  }, [kakaoLoginSdk, naverLoginSdk]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    user.removeAll();
    naverLoginSdk.init({
      clientId: Config().naver.sdk.clientId,
      callbackUrl: Config().naver.redirectUrl,
    });
    kakaoLoginSdk.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <Script 
        src={Config().kakaoSdkJavascriptUrl} 
        integrity={Config().kakaoSdkJavascriptIntegrity} 
        crossOrigin={Config().kakaoSdkJavascriptCrossOrigin}
        defer
        onLoad={() => kakaoLoginSdk.init()}></Script>
      <Script 
        defer
        type="text/javascript" 
        src={Config().naverSdkJavascriptRequiredJqueryUrl}></Script>
      <Script
        defer 
        type="text/javascript" 
        src={Config().naverSdkJavascriptUrl}
        onLoad={() => naverLoginSdk.init({
          clientId: Config().naver.sdk.clientId,
          callbackUrl: Config().naver.redirectUrl,
        })}></Script>

      <WindowSizeContainer>
        <div className={styles['top-row']}>
          <SvgGofieldLogo />
        </div>
        <div className={styles['bottom-row']}>
          <List __direction="vertical" __width="100%">
            <ListItem __marginBottom="10px">
              <button className={[
                  styles['social-login-button'],
                  styles['kakao'],
                ].join(' ')}
                onClick={e => socialLoginButtonClick('KAKAO')}>
                <div className={[
                    styles['content']
                  ].join(' ')}>
                  <SvgSocialSymbolKakao />
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    카카오톡으로 계속하기
                  </div>
                </div>
              </button>
            </ListItem>
            <ListItem __marginBottom="10px">
              <button 
                // id="naver_id_login" 
                className={[
                  styles['social-login-button'],
                  styles['naver'],
                ].join(' ')}
                onClick={e => socialLoginButtonClick('NAVER')}>
                <div className={[
                    styles['content']
                  ].join(' ')}>
                  <SvgSocialSymbolNaver />
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    네이버로 계속하기
                  </div>
                </div>
              </button>
              <div
                id="naver_id_login" 
                className={styles['hide-button']}></div>
            </ListItem>
          </List>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
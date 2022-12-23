import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import Config from "../../../../configs/config.export";
import useUserLoginApi from "../../../../hooks/use-apis/use-user-login.api";
import useNaverLoginSdk from "../../../../hooks/use-naver-login-sdk/use-naver-login-sdk.hook";
import useIsSignupPageAccessedQuery, { setIsSignupPageAccessed } from "../../../../hooks/use-queries/use-is-singup-page-accessed.query";
import useUser from "../../../../hooks/use-user-hook/use-user.hook";
import { IResponse } from "../../../../interfaces/response/response.interface";
import styles from './index.module.scss';

const AuthCallbackPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 로그인 - 콜백</title>
        <meta name="description" content="고필드 로그인 콜백페이지 입니다." />
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContents />
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const userLoginApi = useUserLoginApi();
  const user = useUser();
  const isSignupPageAccessedQuery = useIsSignupPageAccessedQuery();
  const naverLoginSdk = useNaverLoginSdk();
  const onloadCheckRef = useRef({
    isNaverJsOnloaded: false,
    isMounted: false,
    social: '',
  });

  useEffect(() => {
    if (router.isReady !== true) {
      return;
    }

    onloadCheckRef.current.isMounted = true;

    if (user.isLogined()) {
      user.removeAll();
      router.push('/login');
      return;
    }

    if (typeof router.query._social !== 'string') {
      alert('유효하지 않은 접근입니다. [-3]');
      return;
    }

    if (!new Set(['kakao', 'naver']).has(router.query._social)) {
      alert('유효하지 않은 접근입니다. [-4]');
      return;
    }

    if (typeof router.query._social === 'string') {
      onloadCheckRef.current.social = router.query._social;
    }

    if (router.query._social === 'kakao') {
      disposeKakaoLogin();
    } 

    if (router.query._social === 'naver') {
      disposeNaverLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const disposeKakaoLogin = useCallback(() => {
    if (typeof router.query.code !== 'string') {
      alert('유효하지 않은 접근입니다. [-1]');
      return;
    }

    userLoginApi.getInstance(router.query.code, '', 'KAKAO').then((response) => {
      if (response.data.status !== true) {
        alert(response.data.message);
        return;
      }

      user.setAccessToken(response.data.data.accessToken);
      user.setRefreshToken(response.data.data.refreshToken);

      console.log('response.data.data', response.data.data);

      if (!response.data.data.isSign) {
        // 회원 가입 페이지로 이동..
        console.log('회원 가입 페이지로 이동..');
        router.push('/signup');
        return;
      }

      // 메인페이지로 이동..
      router.push('/');
    }).catch((error) => {
      // ...
    });
  }, [router, user, userLoginApi]);

  const disposeNaverLogin = useCallback(() => {
    if (onloadCheckRef.current.social !== 'naver') {
      return;
    }

    if (onloadCheckRef.current.isMounted !== true) {
      return;
    }

    if (onloadCheckRef.current.isNaverJsOnloaded !== true) {
      return;
    }

    if (user.isLogined()) {
      user.removeAll();
      router.push('/login');
      return;
    }

    naverLoginSdk.init({
      clientId: Config().naver.sdk.clientId,
      callbackUrl: Config().naver.redirectUrl,
    });

    const params = naverLoginSdk.getNaverAuthParams();
    if (params === undefined) {
      return;
    }

    // console.log('params', params);
    userLoginApi.getInstance(params.access_token, params.state, 'NAVER').then((response) => {
      if (response.data.status !== true) {
        alert(response.data.message);
        return;
      }

      user.setAccessToken(response.data.data.accessToken);
      user.setRefreshToken(response.data.data.refreshToken);

      console.log('response.data.data', response.data.data);

      if (!response.data.data.isSign) {
        // 회원 가입 페이지로 이동..
        console.log('회원 가입 페이지로 이동..');
        router.push('/signup');
        return;
      }

      // 메인페이지로 이동..
      router.push('/');
    }).catch((error) => {
      // ...
    });
  }, [naverLoginSdk, router, user, userLoginApi]);

  const naverSdkOnLoad = useCallback(() => {
    console.log('naverSdkOnLoad', router.query._social);

    onloadCheckRef.current.isNaverJsOnloaded = true;
    disposeNaverLogin();
  }, [disposeNaverLogin, router.query._social]);

  return (
    <>
      <Script 
        defer
        type="text/javascript" 
        src={Config().naverSdkJavascriptRequiredJqueryUrl}></Script>
      <Script
        defer 
        type="text/javascript" 
        src={Config().naverSdkJavascriptUrl}
        onLoad={naverSdkOnLoad}></Script>
      <div 
        id="naver_id_login" 
        className={styles['hide-button']}></div>
    </>
  );
};

export default AuthCallbackPage;

import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useUserLoginApi from "../../../../hooks/use-apis/use-user-login.api";
import useIsSignupPageAccessedQuery, { setIsSignupPageAccessed } from "../../../../hooks/use-queries/use-is-singup-page-accessed.query";
import useUser from "../../../../hooks/use-user-hook/use-user.hook";
import { IResponse } from "../../../../interfaces/response/response.interface";

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

  useEffect(() => {
    if (router.isReady !== true) {
      return;
    }

    // console.log('@@@ isSignupPageAccessedQuery.data', isSignupPageAccessedQuery.data);
    // if (isSignupPageAccessedQuery.data === null) {
    //   return;
    // }

    // if (isSignupPageAccessedQuery.data === true) {
    //   setIsSignupPageAccessed(false);
    //   isSignupPageAccessedQuery.refetch();
    //   user.removeAll();
    //   return;
    // }

    if (typeof router.query.code !== 'string') {
      alert('유효하지 않은 접근입니다. [-1]');
      return;
    }

    // if (typeof router.query.state !== 'string') {
    //   alert('유효하지 않은 접근입니다. [-2]');
    //   return;
    // }

    if (typeof router.query._social !== 'string') {
      alert('유효하지 않은 접근입니다. [-3]');
      return;
    }

    if (!new Set(['kakao', 'naver']).has(router.query._social)) {
      alert('유효하지 않은 접근입니다. [-4]');
      return;
    }

    userLoginApi.getInstance(router.query.code, router.query._social.toUpperCase()).then((response) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      
    </>
  );
};

export default AuthCallbackPage;

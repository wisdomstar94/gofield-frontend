import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserLogin } from "../../../hooks/use-api-hook/use-api.hook";
import useUser from "../../../hooks/use-user-hook/use-user.hook";
import { IResponse } from "../../../interfaces/response/response.interface";

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
  const userLogin = useUserLogin();
  const user = useUser();

  useEffect(() => {
    if (router.isReady !== true) {
      return;
    }

    if (typeof router.query.code !== 'string') {
      alert('유효하지 않은 접근입니다. [-1]');
      return;
    }

    if (typeof router.query.state !== 'string') {
      alert('유효하지 않은 접근입니다. [-2]');
      return;
    }

    if (typeof router.query.social !== 'string') {
      alert('유효하지 않은 접근입니다. [-3]');
      return;
    }

    userLogin.getInstance(router.query.code, router.query.state, router.query.social).then((response) => {
      if (response.data.status !== true) {
        alert(response.data.message);
        return;
      }

      user.setAccessToken(response.data.data.accessToken);
      user.setRefreshToken(response.data.data.refreshToken);

      if (response.data.data.isFirst) {
        // 회원 가입 페이지로 이동..
        router.push('/signup', undefined, { shallow: true });
        return;
      }

      // 메인페이지로 이동..
      router.push('/', undefined, { shallow: true });
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

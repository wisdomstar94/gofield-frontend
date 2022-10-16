import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

  useEffect(() => {
    if (router.isReady !== true) {
      return;
    }

    console.log('router.query', router.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      
    </>
  );
};

export default AuthCallbackPage;

import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 회원가입</title>
        <meta name="description" content="고필드 회원가입 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="first-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>회원가입</>,
            bgColorTransparency: true,
          }} />

      </WindowSizeContainer>
    </>
  );
};

export default SignupPage;
import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import Image from 'next/image';
import ProfileInfoBox from "../../components/boxes/profile-info-box/profile-info-box.component";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 마이페이지</title>
        <meta name="description" content="고필드 마이페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};  

const PageContents = () => {
  return (
    <>
      <Topbar
        __layoutTypeB={{
          titleComponent: <>마이페이지</>,
          rightComponent: <></>,
        }} />
      <ProfileInfoBox />
    </>
  );
};

export default LoginPage;
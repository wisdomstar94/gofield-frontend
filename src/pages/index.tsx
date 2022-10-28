import type { NextPage } from 'next'
import Head from 'next/head'
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import BannerBox from '../components/boxes/banner-box/banner-box.component';
import Topbar from '../components/layouts/top-bar/top-bar.component';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 메인</title>
        <meta name="description" content="고필드 메인 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  )
};

const PageContents = () => {

  return (
    <>
      <Topbar
        __layoutTypeB={{
          // titleComponent: <>x타이틀</>,
        }} />
      <BannerBox />
    </>
  );
};

export default Home

import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import Image from 'next/image';
import ProfileInfoBox from "../../components/boxes/profile-info-box/profile-info-box.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

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
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>마이페이지</>,
            rightComponent: <></>,
          }} />
        <ProfileInfoBox />
        <MenuRowList
          __menuItems={[
            { menuNameComponent: <>나의 정보 수정</>, menuLink: '/mypage/myinfo-edit', },
            { menuNameComponent: <>주문/배송 조회</>, menuLink: '/order/history', },
            { menuNameComponent: <>좋아요</>, menuLink: '/likes', },
            { menuNameComponent: <>최근 본 상품</>, menuLink: '/recent', },
            { menuNameComponent: <>리뷰 관리</>, menuLink: '/review', },
            { menuNameComponent: <>취소 반품 교환</>, menuLink: '/cancel-return-exchange', },
            { menuNameComponent: <>고객센터</>, menuLink: '/customer-center', },
            { menuNameComponent: <>설정</>, menuLink: '/setting', },
          ]} />
        <BottomMenuBar
          __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
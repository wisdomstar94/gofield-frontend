import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../../components/boxes/menu-row-list/menu-row-list.component";
import BottomMenuBar from "../../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 마이페이지 - 내 정보 수정</title>
        <meta name="description" content="고필드 마이페이지 - 내 정보 수정 페이지 입니다." />
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
          titleComponent: <>내 정보  수정</>,
          rightComponent: <></>,
        }} />
      <MenuRowList
        __menuItems={[
          { menuNameComponent: <>프로필 수정</>, menuLink: '', },
          { menuNameComponent: <>휴대폰 번호 변경</>, menuLink: '', },
          { menuNameComponent: <>환불 계좌 관리</>, menuLink: '', },
        ]} />
      <BottomMenuBar
        __activeMenuId="my-page" />
    </>
  );
};

export default LoginPage;
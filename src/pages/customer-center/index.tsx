import Head from "next/head";
import React, { useCallback } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import Config from "../../configs/config.export";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>Q&A</title>
        <meta name="description" content="고필드 Q&A 페이지입니다." />
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
            titleComponent: <>고객센터</>,
            rightComponent: <></>,
          }} />
        <div className="w-full h-4"></div>
        <MenuRowList
          __menuItems={[
            {
              menuNameComponent: <>자주 묻는 질문</>,
              menuLink: '/faq',
            },
            {
              menuNameComponent: <>카카오톡 고객센터</>,
              menuLink: '/kakaotalk-customer-center',
            },
            {
              menuNameComponent: <>공지사항</>,
              menuLink: '/notice',
            },
            {
              menuNameComponent: <>개인정보처리방침</>,
              menuLink: `/terms/privacy/privacy-${Config().terms.privacyRecentDate}`,
            },
            {
              menuNameComponent: <>이용약관</>,
              menuLink: `/terms/use-service/use-service-${Config().terms.privacyRecentDate}`,
            },
          ]} />
        <BottomMenuBar __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
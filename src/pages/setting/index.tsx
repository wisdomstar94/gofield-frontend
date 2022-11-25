import Head from "next/head";
import React, { useCallback } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import PreparingBox from "../../components/boxes/preparing-box/preparing-box.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import SwitchToggleButton from "../../components/forms/switch-toggle-button/switch-toggle-button.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>설정</title>
        <meta name="description" content="고필드 설정 페이지입니다." />
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
            titleComponent: <>설정</>,
            rightComponent: <></>,
          }} />
        <div className="w-full h-4"></div>
        <MenuRowList
          __menuItems={[
            {
              menuNameComponent: <>
                <div className="w-full grid grid-cols-2">
                  <div className="flex flex-wrap items-center justify-start">
                    이벤트 및 혜택 알림
                  </div>
                  <div className="flex flex-wrap items-center justify-end">
                    <SwitchToggleButton __isActive={true} />
                  </div>
                </div>
              </>,
              menuLink: '',
            },
            {
              menuNameComponent: <>SNS로그인 설정</>,
              menuLink: '/sns-login-setting',
            },
            {
              menuNameComponent: <>로그아웃</>,
              menuLink: '',
              menuClickCallback: () => {

              },
            },
            {
              menuNameComponent: <>회원탈퇴</>,
              menuLink: '/sign-out',
            },
          ]} />
        <BottomMenuBar __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
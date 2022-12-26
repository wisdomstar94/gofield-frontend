import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import PreparingBox from "../../components/boxes/preparing-box/preparing-box.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import SwitchToggleButton from "../../components/forms/switch-toggle-button/switch-toggle-button.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useUserAlertChangeApi from "../../hooks/use-apis/use-user-alert-change.api";
import useUserLogoutApi from "../../hooks/use-apis/use-user-logout.api";
import useModalConfirm from "../../hooks/use-modals/use-modal-confirm.modal";
import useUserAlertValueQuery from "../../hooks/use-queries/use-user-alert-value.query";
import useUser from "../../hooks/use-user-hook/use-user.hook";

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
  const userAlertChangeApi = useUserAlertChangeApi();
  const userAlertValueQuery = useUserAlertValueQuery();
  const isAlertChangingRef = useRef(false);

  const router = useRouter();
  const modalConfirm = useModalConfirm();
  const userLogoutApi = useUserLogoutApi();
  const user = useUser();
  const isLogoutingRef = useRef(false);

  const alertValueChange = useCallback((v: boolean) => {
    isAlertChangingRef.current = true;
    userAlertChangeApi.getInstance(v).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      userAlertValueQuery.refetch();
    }).finally(() => {
      isAlertChangingRef.current = false;
    });
  }, [userAlertChangeApi, userAlertValueQuery]);

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
                    <SwitchToggleButton 
                      __isActive={userAlertValueQuery.data === true}
                      __onChange={alertValueChange} />
                  </div>
                </div>
              </>,
              menuLink: '',
            },
            // {
            //   menuNameComponent: <>SNS로그인 설정</>,
            //   menuLink: '/sns-login-setting',
            // },
            {
              menuNameComponent: <>로그아웃</>,
              menuLink: '',
              menuClickCallback: () => {
                if (isLogoutingRef.current) {
                  return;
                }

                modalConfirm.show({
                  title: '안내',
                  content: '정말 로그아웃하시겠습니끼?',
                  positiveCallback(hide, modalItem) {
                    isLogoutingRef.current = true;
                    userLogoutApi.getInstance().finally(() => {
                      isLogoutingRef.current = false;
                      user.removeAll();
                      hide(modalItem);
                      router.push('/');
                    });
                  },
                });
              },
            },
            {
              menuNameComponent: <>회원탈퇴</>,
              menuLink: '/signOut',
            },
          ]} />
        <BottomMenuBar __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
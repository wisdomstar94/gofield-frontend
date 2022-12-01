import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import Button from "../../components/forms/button/button.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useUserSignOutApi from "../../hooks/use-apis/use-user-sign-out.api";
import useModalAlert from "../../hooks/use-modals/use-modal-alert.modal";
import useModalConfirm from "../../hooks/use-modals/use-modal-confirm.modal";
import useUser from "../../hooks/use-user-hook/use-user.hook";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>회원 탈퇴</title>
        <meta name="description" content="고필드 회원 탈퇴 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const modalConfirm = useModalConfirm();
  const modalAlert = useModalAlert();
  const userSignOutApi = useUserSignOutApi();
  const isSignOutingRef = useRef(false);
  const user = useUser();
  const router = useRouter();

  const executeSignOutButtonClick = useCallback(() => {
    if (isSignOutingRef.current) {
      return;
    }

    modalConfirm.show({
      title: '안내',
      content: '정말 회원 탈퇴를 진행하시겠습니까?',
      positiveCallback: (hide, modalItem) => {
        isSignOutingRef.current = true;
        userSignOutApi.getInstance().then((response) => {
          if (response.data.status !== true) {
            modalAlert.show({ title: '안내', content: '회원 탈퇴에 실패하였습니다.' });
            return;
          }

          user.removeAll();
          modalAlert.show({ title: '안내', content: '회원 탈퇴가 완료되었습니다.' });
          router.push('/login');
        }).finally(() => {
          isSignOutingRef.current = false;
          hide(modalItem);
        });
      },
    });
  }, [modalAlert, modalConfirm, router, user, userSignOutApi]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>회원 탈퇴</>,
            rightComponent: <></>,
          }} />
        
        <div className="w-full box-sizing px-6 pt-6 pb-2">
          <span className="text-black-b font-bold text-base">정말 탈퇴하시겠어요?</span>
        </div>

        <div className="w-full box-sizing px-6">
          <span className="text-sm text-black-b font-normal">
            탈퇴하면 모든 정보(좋아요 상품, 장바구니, 결제/주문내역 등)가 삭제되며 복구되지 않습니다.<br />
            탈퇴 이전에 적립된 적립금은 모두 소멸되며, 재지급되지 않습니다.<br />
            <br />
            연동된 SNS계정이 있는 경우 함께 탈퇴됩니다.<br />
            <br />
            단, 관련 법령에 의거하여 일정 기간 정보를 보유할 필요가 있을 경우 법이 정한 기간 동안 해당 정보를 보유합니다.
          </span>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={200} __style={{ marginBottom: '61px' }}>
          <div className="w-full box-sizing px-6 pb-6 pt-4">
            <div className="w-full grid grid-cols-2 gap-2">
              <div>
                <Button __buttonStyle="white-solid-gray-stroke" __onClick={executeSignOutButtonClick}>회원탈퇴</Button>
              </div>
              <div>
                <Button __buttonStyle="black-solid" __onClick={() => { history.back() }}>취소</Button>
              </div>
            </div>
          </div>
        </BottomFixedOrRelativeBox>

        <BottomMenuBar __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import RefundAccountFormBox from "../../../../components/boxes/refund-account-form-box/refund-account-form-box.component";
import { IRefundAccountFormBox } from "../../../../components/boxes/refund-account-form-box/refund-account-form-box.interface";
import Button from "../../../../components/forms/button/button.component";
import Article from "../../../../components/layouts/article/article.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import useUserRefundAccountUpdateApi from "../../../../hooks/use-apis/use-user-refund-account-update.api";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 마이페이지 - 내 정보 수정 - 환불계좌 관리</title>
        <meta name="description" content="고필드 마이페이지 - 내 정보 수정 - 환불계좌 관리 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};  

const PageContents = () => {
  const formBoxComponentRef = useRef<IRefundAccountFormBox.RefObject>(null);
  const modalAlert = useModalAlert();
  const userRefundAccountUpdateApi = useUserRefundAccountUpdateApi();
  const isUpdaingRef = useRef(false);

  const saveButtonClick = useCallback(() => {
    if (isUpdaingRef.current) {
      return;
    }

    if (formBoxComponentRef.current === null) {
      return;
    }

    const detailInfo = formBoxComponentRef.current.getDetailInfo();
    console.log('detailInfo', detailInfo);

    if (typeof detailInfo.accountHolderName !== 'string' || detailInfo.accountHolderName?.trim() === '') {
      modalAlert.show({ title: '안내', content: '예금주명을 입력해주세요.' });
      return;
    }

    if (typeof detailInfo.bankValueItem?.value !== 'string' || detailInfo.bankValueItem?.value?.trim() === '') {
      modalAlert.show({ title: '안내', content: '은행을 선택해주세요.' });
      return;
    }

    if (typeof detailInfo.accountNumber !== 'string' || detailInfo.accountNumber?.trim() === '') {
      modalAlert.show({ title: '안내', content: '계좌번호를 입력해주세요.' });
      return;
    }

    if (detailInfo.privacyTermAgree !== true) {
      modalAlert.show({ title: '안내', content: '개인정보 수집 및 이용동의에 동의해주세요.' });
      return;
    }

    isUpdaingRef.current = true;
    userRefundAccountUpdateApi.getInstance(detailInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '정보 변경에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '환불 계좌 정보가 변경되었습니다.' });
      formBoxComponentRef.current?.clear();
    }).finally(() => {
      isUpdaingRef.current = false;
    });
  }, [modalAlert, userRefundAccountUpdateApi]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>환불계좌 관리</>,
            rightComponent: <></>,
          }} />
        {/* <ProfileFormBox ref={formBoxComponentRef} /> */}
        <RefundAccountFormBox ref={formBoxComponentRef} />
        <BottomFixedOrRelativeBox __heightToRelative={560}>
          <Article>
            <Button __buttonStyle="black-solid" __onClick={saveButtonClick}>
              저장
            </Button>
          </Article>
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
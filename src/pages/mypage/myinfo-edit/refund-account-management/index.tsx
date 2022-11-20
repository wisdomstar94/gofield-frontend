import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import ProfileFormBox from "../../../../components/boxes/profile-form-box/profile-form-box.component";
import { IProfileFormBox } from "../../../../components/boxes/profile-form-box/profile-form-box.interface";
import RefundAccountFormBox from "../../../../components/boxes/refund-account-form-box/refund-account-form-box.component";
import Button from "../../../../components/forms/button/button.component";
import Article from "../../../../components/layouts/article/article.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";

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
  const formBoxComponentRef = useRef<IProfileFormBox.RefObject>(null);

  const saveButtonClick = useCallback(() => {
    if (formBoxComponentRef.current === null) {
      return;
    }

    const detailInfo = formBoxComponentRef.current.getDetailInfo();
    console.log('detailInfo', detailInfo);
  }, []);

  return (
    <>
      <Topbar
        __layoutTypeB={{
          titleComponent: <>환불계좌 관리</>,
          rightComponent: <></>,
        }} />
      {/* <ProfileFormBox ref={formBoxComponentRef} /> */}
      <RefundAccountFormBox />
      <BottomFixedOrRelativeBox __heightToRelative={640}>
        <Article>
          <Button __buttonStyle="black-solid" __onClick={saveButtonClick}>
            저장
          </Button>
        </Article>
      </BottomFixedOrRelativeBox>
    </>
  );
};

export default LoginPage;
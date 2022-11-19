import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import PhoneNumberFormBox from "../../../../components/boxes/phone-number-form-box/phone-number-form-box.component";
import { IPhoneNumberFormBox } from "../../../../components/boxes/phone-number-form-box/phone-number-form-box.interface";
import ProfileFormBox from "../../../../components/boxes/profile-form-box/profile-form-box.component";
import { IProfileFormBox } from "../../../../components/boxes/profile-form-box/profile-form-box.interface";
import Button from "../../../../components/forms/button/button.component";
import Article from "../../../../components/layouts/article/article.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 마이페이지 - 내 정보 수정 - 휴대폰 번호 변경</title>
        <meta name="description" content="고필드 마이페이지 - 내 정보 수정 - 휴대폰 번호 변경 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};  

const PageContents = () => {
  const formBoxComponentRef = useRef<IPhoneNumberFormBox.RefObject>(null);

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
          titleComponent: <>휴대폰 번호 변경</>,
          rightComponent: <></>,
        }} />
      <PhoneNumberFormBox ref={formBoxComponentRef} />
      <Article>
        <Button __buttonStyle="black-solid" __onClick={saveButtonClick}>
          인증완료
        </Button>
      </Article>
    </>
  );
};

export default LoginPage;
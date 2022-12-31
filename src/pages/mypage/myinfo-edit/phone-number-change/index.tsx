import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import PhoneNumberFormBox from "../../../../components/boxes/phone-number-form-box/phone-number-form-box.component";
import { IPhoneNumberFormBox } from "../../../../components/boxes/phone-number-form-box/phone-number-form-box.interface";
import ProfileFormBox from "../../../../components/boxes/profile-form-box/profile-form-box.component";
import { IProfileFormBox } from "../../../../components/boxes/profile-form-box/profile-form-box.interface";
import TitleContentBoxV1 from "../../../../components/boxes/title-content-box-v1/title-content-box-v1.component";
import Button from "../../../../components/forms/button/button.component";
import Article from "../../../../components/layouts/article/article.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import useUserTelInfoQuery from "../../../../hooks/use-queries/use-user-tel-info.query";

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
  const userTelInfoQuery = useUserTelInfoQuery();

  // const saveButtonClick = useCallback(() => {
  //   if (formBoxComponentRef.current === null) {
  //     return;
  //   }

  //   const detailInfo = formBoxComponentRef.current.getDetailInfo();
  //   // console.log('detailInfo', detailInfo);
  // }, []);

  const onTelAuthPassed = useCallback(() => {
    userTelInfoQuery.refetch();
  }, [userTelInfoQuery]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>휴대폰 번호 변경</>,
            rightComponent: <></>,
          }} />
        <TitleContentBoxV1
          __title={<>현재 휴대폰 번호</>}
          __content={<>{ userTelInfoQuery.data?.tel ?? '현재 등록된 휴대폰번호가 없습니다.' }</>} />
        <PhoneNumberFormBox 
          ref={formBoxComponentRef}
          __onTelAuthPassed={onTelAuthPassed} />
        <BottomFixedOrRelativeBox __heightToRelative={100}>
          {/* <Article>
            <Button __buttonStyle="black-solid" __onClick={saveButtonClick}>
              인증완료
            </Button>
          </Article> */}
        </BottomFixedOrRelativeBox>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
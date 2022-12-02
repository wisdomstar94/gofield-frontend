import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../../../atoms/global-modal-default.atom";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import ProfileFormBox from "../../../../components/boxes/profile-form-box/profile-form-box.component";
import { IProfileFormBox } from "../../../../components/boxes/profile-form-box/profile-form-box.interface";
import Button from "../../../../components/forms/button/button.component";
import Article from "../../../../components/layouts/article/article.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import useUserProfileUpdateApi from "../../../../hooks/use-apis/use-user-profile-update.api";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 마이페이지 - 내 정보 수정 - 프로필 수정</title>
        <meta name="description" content="고필드 마이페이지 - 내 정보 수정 - 프로필 수정 페이지 입니다." />
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
  const userProfileUpdateApi = useUserProfileUpdateApi();
  const isProfileUpdaingRef = useRef(false);
  const modalAlert = useModalAlert();

  const saveButtonClick = useCallback(() => {
    if (isProfileUpdaingRef.current) {
      return;
    }

    if (formBoxComponentRef.current === null) {
      return;
    }

    const detailInfo = formBoxComponentRef.current.getDetailInfo();
    // console.log('detailInfo', detailInfo);
    
    if (detailInfo === undefined) {
      return;
    }

    isProfileUpdaingRef.current = true;
    userProfileUpdateApi.getInstance(detailInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '프로필 정보 수정에 실패하였습니다.' });
        return;
      }      

      modalAlert.show({ title: '안내', content: '프로필 정보 수정이 완료되었습니다.' });
    }).catch((error) => {

    }).finally(() => {
      isProfileUpdaingRef.current = false;
    });    
  }, [modalAlert, userProfileUpdateApi]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>프로필 수정</>,
            rightComponent: <></>,
          }} />
        <ProfileFormBox ref={formBoxComponentRef} />
        <BottomFixedOrRelativeBox __heightToRelative={100}>
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
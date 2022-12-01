import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Button from "../../components/forms/button/button.component";
import Input from "../../components/forms/input/input.component";
import MultipleCheckItems from "../../components/forms/multiple-check-items/multiple-check-items.component";
import TermsCheck from "../../components/forms/terms-check/terms-check.component";
import Formbox, { FormboxItem } from "../../components/layouts/form-box/form-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useUserSignupApi from "../../hooks/use-apis/use-user-sign-up.api";
import useCategoryListQuery from "../../hooks/use-queries/use-category-list.query";
import useUser from "../../hooks/use-user-hook/use-user.hook";
import { ISignup } from "../../interfaces/signup/signup.interface";

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 회원가입</title>
        <meta name="description" content="고필드 회원가입 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="first-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const user = useUser(); 
  const userSignupApi = useUserSignupApi();
  const router = useRouter();
  const categoryListQuery = useCategoryListQuery();

  const [signupButtonState, setSignupButtonState] = useState<'invalid' | 'valid'>('invalid');
  const signupDetailInfoRef = useRef<ISignup.SingupDetailInfo>({
    weight: '',
    height: '',
    email: '',
    agreeList: [],
    categoryList: [],
    selectionList: [],
  });

  const [socialText, setSocialText] = useState('');
  useEffect(() => {
    const payload = user.getAccessTokenPayload();
    if (payload?.social === 'KAKAO') {
      setSocialText('카카오 ID로 연결됨');
    } else if (payload?.social === 'NAVER'){
      setSocialText('네이버 ID로 연결됨');
    }
  }, [user]);

  const detailInfoChange = useCallback(() => {
    if (typeof signupDetailInfoRef.current.height !== 'string') {
      setSignupButtonState('invalid');
      return;
    }

    if (signupDetailInfoRef.current.height.trim() === '') {
      setSignupButtonState('invalid');
      return;
    }

    if (isNaN(Number(signupDetailInfoRef.current.height))) {
      setSignupButtonState('invalid');
      return;
    }

    if (typeof signupDetailInfoRef.current.weight !== 'string') {
      setSignupButtonState('invalid');
      return;
    }

    if (signupDetailInfoRef.current.weight.trim() === '') {
      setSignupButtonState('invalid');
      return;
    }

    if (isNaN(Number(signupDetailInfoRef.current.weight))) {
      setSignupButtonState('invalid');
      return;
    }

    if (signupDetailInfoRef.current.agreeList.length !== 2) {
      setSignupButtonState('invalid');
      return;
    }

    setSignupButtonState('valid');
  }, []);

  const signupButtonClick = useCallback(() => {
    userSignupApi.getInstance(signupDetailInfoRef.current).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      user.setAccessToken(response.data.data.accessToken);
      user.setRefreshToken(response.data.data.refreshToken);

      alert('회원가입이 완료되었습니다.');
      router.push('/');
    }).catch((error) => {

    });
  }, [router, user, userSignupApi]);

  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>회원가입</>,
            bgColorTransparency: true,
          }} />
        <Formbox>
          <FormboxItem
            __titleComponent={<>{ socialText }&nbsp;<span style={{ color: '#ff6247' }}>*</span></>}
            __contentComponent={
              <>
                {/* <Input
                  __type="text"
                  __value="naver.com..."
                  __disable={true}
                  __onChange={e => {  }} /> */}
              </>
            } />
          <FormboxItem
            __titleComponent={<>신체사이즈</>}
            __contentComponent={
              <>
                <Input
                  __type="number"
                  __placeholder="키(cm)"
                  __value={signupDetailInfoRef.current.height}
                  __onChange={value => { signupDetailInfoRef.current.height = value; detailInfoChange(); }} />
                <div style={{ height: '10px' }}></div>
                <Input
                  __type="number"
                  __placeholder="몸무게(kg)"
                  __value={signupDetailInfoRef.current.weight}
                  __onChange={value => { signupDetailInfoRef.current.weight = value; detailInfoChange(); }} />
              </>
            } />
          <FormboxItem
            __titleComponent={<>관심 스포츠 종목</>}
            __contentComponent={
              <>
                <MultipleCheckItems
                  __valueItems={categoryListQuery.data ?? []}
                  __onChange={info => { signupDetailInfoRef.current.categoryList = info.currentCheckedValues.map(x => Number(x)); detailInfoChange(); }} />
              </>
            } />
          <FormboxItem
            __titleComponent={<>약관동의</>}
            __contentComponent={
              <>
                <TermsCheck
                  __onAgreeListChange={agreeList => { signupDetailInfoRef.current.agreeList = agreeList; detailInfoChange(); }}
                  __onSelectionListChange={selectionList => { signupDetailInfoRef.current.selectionList = selectionList; detailInfoChange(); }} />
              </>
            } />
          <FormboxItem
            __titleComponent={<></>}
            __contentComponent={
              <>
                <Button
                  __disable={signupButtonState === 'invalid'}
                  __onClick={signupButtonClick}>
                  가입하기
                </Button>
              </>
            } />
        </Formbox>
      </WindowSizeContainer>
    </>
  );
};

export default SignupPage;
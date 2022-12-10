import { NextPage } from "next";
import styles from './index.module.scss';
import Head from "next/head";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import SvgGofieldLogo from "../../components/svgs/svg-gofield-logo/svg-gofield-logo.component";
import List, { ListItem } from "../../components/layouts/list/list.component";
import SvgSocialSymbolKakao from "../../components/svgs/svg-social-symbol-kakao/svg-social-symbol-kakao.component";
import SvgSocialSymbolNaver from "../../components/svgs/svg-social-symbol-naver/svg-social-symbol-naver.component";
import { useCallback } from "react";
import Config from "../../configs/config.export";
import NotLoginCheck from "../../components/auth/not-login-check/not-login-check.component";
import { ILogin } from "../../interfaces/login/login.interface";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 로그인</title>
        <meta name="description" content="고필드 로그인 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotLoginCheck>
        <PageContents />
      </NotLoginCheck>
    </>
  );
};  

const PageContents = () => {
  const socialLoginButtonClick = useCallback((socialType: ILogin.SocialType) => {
    let environment = '';
    switch (Config().mode) {
      case 'local': environment = 'LOCAL'; break;
      case 'development': environment = 'DEV'; break;
      case 'production': environment = 'PROD'; break;
    }
    if (environment === '') {
      alert('유효하지 않은 요청입니다.');
      return;
    }

    const url = Config().api.third.ready._ + `?environment=${environment}&social=${socialType}`;
    location.href = url;
  }, []);

  return (
    <>
      <WindowSizeContainer>
        <div className={styles['top-row']}>
          <SvgGofieldLogo />
        </div>
        <div className={styles['bottom-row']}>
          <List __direction="vertical" __width="100%">
            <ListItem __marginBottom="10px">
              <button className={[
                  styles['social-login-button'],
                  styles['kakao'],
                ].join(' ')}
                onClick={e => socialLoginButtonClick('KAKAO')}>
                <div className={[
                    styles['content']
                  ].join(' ')}>
                  <SvgSocialSymbolKakao />
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    카카오톡으로 계속하기
                  </div>
                </div>
              </button>
            </ListItem>
            <ListItem __marginBottom="10px">
              <button className={[
                  styles['social-login-button'],
                  styles['naver'],
                ].join(' ')}
                onClick={e => socialLoginButtonClick('NAVER')}>
                <div className={[
                    styles['content']
                  ].join(' ')}>
                  <SvgSocialSymbolNaver />
                  <div className={[
                      styles['text-area']
                    ].join(' ')}>
                    네이버로 계속하기
                  </div>
                </div>
              </button>
            </ListItem>
          </List>
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
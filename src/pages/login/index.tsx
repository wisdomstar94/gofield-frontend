import { NextPage } from "next";
import styles from './index.module.scss';
import Head from "next/head";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import SvgGofieldLogo from "../../components/svgs/svg-gofield-logo/svg-gofield-logo.component";
import List, { ListItem } from "../../components/layouts/list/list.component";
import SvgSocialSymbolKakao from "../../components/svgs/svg-social-symbol-kakao/svg-social-symbol-kakao.component";
import SvgSocialSymbolNaver from "../../components/svgs/svg-social-symbol-naver/svg-social-symbol-naver.component";
import SvgSocialSymbolApple from "../../components/svgs/svg-social-symbol-apple/svg-social-symbol-apple.component";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 로그인</title>
        <meta name="description" content="고필드 로그인 페이지 입니다." />
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContents />
    </>
  );
};  

const PageContents = () => {
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
                ].join(' ')}>
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
                ].join(' ')}>
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
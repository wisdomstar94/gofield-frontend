import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { globalModalDefaultModalItemAtom } from '../atoms/global-modal-default.atom';
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import Config from '../configs/config.export';
import { useErrorApi } from '../hooks/use-api-hook/use-api.hook';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드</title>
        <meta name="description" content="고필드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  )
};

const PageContents = () => {
  const errorApi = useErrorApi();
  const [_, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const globalModalTestButtonClick = useCallback(() => {
    setGlobalModalDefaultModalItem({
      titleStyleB: {
        component: <>테스트 111</>,
      },
      contentComponent: <>테스트 222</>,
      negativeButtonState: 'show',
      positiveButtonState: 'show',
      onPositiveButtonClick(hide, modalItem) {
        console.log('oh!! !!!');
        hide(modalItem);
      },
      modalState: 'show',
    });
  }, [setGlobalModalDefaultModalItem]);

  const errorApiCall = useCallback(() => {
    errorApi.getInstance().then((response) => {

    });
  }, [errorApi]);

  return (
    <>
      main page
      {/* {'{}'} <br />
      {Config().mode} <br />
      {Config().test.var4}
      <button onClick={globalModalTestButtonClick}>global modal test</button>
      <button onClick={errorApiCall}>errorApiCall</button> */}
    </>
  );
};

export default Home

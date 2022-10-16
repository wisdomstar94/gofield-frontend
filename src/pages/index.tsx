import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Config from '../configs/config.export';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드</title>
        <meta name="description" content="고필드 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContents />
    </>
  )
};

const PageContents = () => {
  return (
    <>
      {'{}'} <br />
      {Config().mode} <br />
      {Config().test.var4}
    </>
  );
};

export default Home

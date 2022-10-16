import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import RootComponent from './_root';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RecoilRoot>
        <RootComponent>
          <Component {...pageProps} />    
        </RootComponent>
      </RecoilRoot>
    </>
  );
}

export default MyApp

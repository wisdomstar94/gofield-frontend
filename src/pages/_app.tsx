import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import RootComponent from './_root';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <RootComponent>
        <Component {...pageProps} />    
      </RootComponent>
    </RecoilRoot>
  );
}

export default MyApp

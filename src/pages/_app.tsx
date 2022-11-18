import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import RootComponent from './_root';
import Head from 'next/head';
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) {
        console.error(error);
        console.error(`에러가 났어요!!: ${error}`);
      }
    },
    onSuccess: data => {
      console.log(data);
      console.log('데이터를 정상적으로 캐싱했어요!');
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          <RootComponent>
            <Component {...pageProps} />
          </RootComponent>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp

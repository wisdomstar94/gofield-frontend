import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useModalAlert from "../../hooks/use-modals/use-modal-alert.modal";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>주문 완료</title>
        <meta name="description" content="고필드 주문 완료 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const modalAlert = useModalAlert();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderNumber = router.query._orderNumber;
    if (typeof orderNumber !== 'string') {
      modalAlert.show({ title: '안내', content: '잘못된 접근입니다.' });
      return;
    }

    router.push('/order/' + orderNumber + '?originType=byOrder');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>주문 완료</>,
            rightComponent: <></>,
          }} />
        
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
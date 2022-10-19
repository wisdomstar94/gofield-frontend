import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccessTokenCheck from "../../../../../../../components/auth/access-token-check/access-token-check.component";

const ExchangeReturnApplyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 교환/반품 신청</title>
        <meta name="description" content="고필드 교환/반품 신청 페이지 입니다." />
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

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const {
      _orderId,
      _productId,
      reasonList,
    } = router.query;
    console.log('_orderId', _orderId);
    console.log('_productId', _productId);
    console.log('reasonList', reasonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      apply...
    </>
  );
};

export default ExchangeReturnApplyPage;
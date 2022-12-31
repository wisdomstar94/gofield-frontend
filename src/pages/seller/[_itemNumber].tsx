import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import TitleContentBoxV1 from "../../components/boxes/title-content-box-v1/title-content-box-v1.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useItemSellerInfoQuery from "../../hooks/use-queries/use-item-seller-info.query";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 판매자정보</title>
        <meta name="description" content="고필드 판매자정보 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="not-login-or-sign-true">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const [itemNumber, setItemNumber] = useState('');
  const itemSellerInfoQuery = useItemSellerInfoQuery(itemNumber);

  useEffect(() => {
    console.log('itemSellerInfoQuery.data', itemSellerInfoQuery.data);
  }, [itemSellerInfoQuery.data]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query._itemNumber === 'string') {
      setItemNumber(router.query._itemNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>
              판매자 정보
            </>
          }} />
        <TitleContentBoxV1 
          __title={<>판매처</>}
          __content={<>{ itemSellerInfoQuery.data?.name }</>}
          />
        <TitleContentBoxV1 
          __title={<>판매처 주소지</>}
          __content={<>
            { itemSellerInfoQuery.data?.shippingTemplate.address }
            { itemSellerInfoQuery.data?.shippingTemplate.addressExtra }&nbsp;
            { typeof itemSellerInfoQuery.data?.shippingTemplate.zipCode === 'string' ? `(${itemSellerInfoQuery.data?.shippingTemplate.zipCode})` : '' }
          </>}
          />
        <TitleContentBoxV1 
          __title={<>상품문의</>}
          __content={<>{ itemSellerInfoQuery.data?.tel }</>}
          />
        {
          typeof itemSellerInfoQuery.data?.shippingTemplate.shippingComment === 'string' ?
          <TitleContentBoxV1 
            __title={<>배송관련정보</>}
            __content={<>{ itemSellerInfoQuery.data?.shippingTemplate.shippingComment }</>}
            /> : 
          <></>
        }
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
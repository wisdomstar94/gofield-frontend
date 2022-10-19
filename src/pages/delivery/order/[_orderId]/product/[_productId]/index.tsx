import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccessTokenCheck from "../../../../../../components/auth/access-token-check/access-token-check.component";
import LinkText from "../../../../../../components/forms/link-text/link-text.component";
import ProductRowItem from "../../../../../../components/forms/product-row-item/product-row-item.component";
import StepItems from "../../../../../../components/forms/step-items/step-items.component";
import StrokeButtons from "../../../../../../components/forms/stroke-buttons/stroke-buttons.component";
import BothSidebox from "../../../../../../components/layouts/both-side-box/both-side-box.component";
import ContentArticle from "../../../../../../components/layouts/content-article/content-article.component";
import EmptyRow from "../../../../../../components/layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../../../../../components/layouts/list/list.component";
import Titlebox from "../../../../../../components/layouts/title-box/title-box.component";
import Topbar from "../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../components/layouts/window-size-container/window-size-container.component";

const OrderProductDeliveryStatePage = () => {
  return (
    <>
      <Head>
        <title>고필드 배송조회</title>
        <meta name="description" content="고필드 배송조회 페이지 입니다." />
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
    } = router.query;
    console.log('_orderId', _orderId);
    console.log('_productId', _productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>배송조회</>
          }} />

        <ContentArticle>
          <Titlebox
            __titleStyleA={{
              component: <>상품이 배송 중입니다</>,
            }} />
          <StepItems
            __stepItems={[
              {
                textComponent: <>결제 완료</>,
                state: 'pass',
              },
              {
                textComponent: <>배송 준비중</>,
                state: 'pass',
              },
              {
                textComponent: <>배송중</>,
                state: 'current',
              },
              {
                textComponent: <>배송 완료</>,
                state: 'yet',
              },
            ]} />
          <EmptyRow __style={{ height: '48px' }} />
          <BothSidebox
            __style={{ 'alignItems': 'flex-start' }}
            __leftComponent={<>
              <List __direction="vertical">
                <ListItem>
                  <span style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'bold' }}>CJ 대한통운</span>
                </ListItem>
                <ListItem>
                  <span style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'normal' }}>운솔장번호</span>
                  <span>&nbsp;</span>
                  <span style={{ fontSize: '0.8rem', color: '#0c8af5', fontWeight: 'normal' }}>123123123</span>
                </ListItem>
              </List>
            </>}
            __rightComponent={<>
              <LinkText __onClick={() => {  }}>자세히보기</LinkText>
            </>} />
          <EmptyRow __style={{ height: '24px' }} />
          <StrokeButtons
            __buttonItems={[
              {
                textComponent: <>CJ대한통운</>,
                onClick: () => {

                },
              },
              {
                textComponent: <>배송기사</>,
                onClick: () => {

                },
              },
            ]} />
        </ContentArticle>

        <ContentArticle>
          <BothSidebox 
            __leftComponentStyle={{ 'width': '0' }}
            __rightComponentStyle={{ 'width': '100%' }}
            __leftComponent={<></>}
            __rightComponent={<><LinkText __onClick={() => {  }}>주문 상세보기</LinkText></>} />
          <EmptyRow __style={{ 'height': '24px' }} />
          <ProductRowItem />
          <ProductRowItem />
        </ContentArticle>    

        <ContentArticle>
          <List __width="100%" __direction="vertical" __defaultItemMarginBottom="10px">
            <ListItem>
              <span style={{ fontSize: '0.9rem', color: '#374553', fontWeight: 'bold' }}>홍길동</span>
            </ListItem>
            <ListItem __marginBottom="20px">
              <span style={{ fontSize: '0.9rem', color: '#1e2238', fontWeight: 'normal' }}>
                (00000) 서울특별시 강남구 역삼동 12345 123<br />
                010-0000-0000
              </span>
            </ListItem>
            <ListItem __marginBottom="20px">
              <EmptyRow __style={{ height: '1px', backgroundColor: '#e9ebee' }}></EmptyRow>
            </ListItem>
            <ListItem __marginBottom="0">
              <span style={{ fontSize: '0.9rem', color: '#1e2238', fontWeight: 'normal' }}>
                배송요청사항 : 문 앞에 놔두고 가주세요
              </span>
            </ListItem>
          </List>
        </ContentArticle>
      </WindowSizeContainer>
    </>
  );
};

export default OrderProductDeliveryStatePage;

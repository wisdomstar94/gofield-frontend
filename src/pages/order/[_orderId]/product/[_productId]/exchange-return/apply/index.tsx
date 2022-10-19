import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AccessTokenCheck from "../../../../../../../components/auth/access-token-check/access-token-check.component";
import BothSidebox from "../../../../../../../components/layouts/both-side-box/both-side-box.component";
import ContentArticle from "../../../../../../../components/layouts/content-article/content-article.component";
import List, { ListItem } from "../../../../../../../components/layouts/list/list.component";
import Topbar from "../../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../../components/layouts/window-size-container/window-size-container.component";
import styles from './index.module.scss';
import Image from 'next/image';
import EmptyRow from "../../../../../../../components/layouts/empty-row/empty-row.component";
import { useExchangeReturnReasonValueItems } from "../../../../../../../hooks/use-api-hook/use-api.hook";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../../../../../../atoms/global-modal-default.atom";
import Titlebox from "../../../../../../../components/layouts/title-box/title-box.component";
import Checkbox from "../../../../../../../components/forms/checkbox/checkbox.component";
import Button from "../../../../../../../components/forms/button/button.component";
import { getNextRouterQueryToUrlQueryString } from "../../../../../../../librarys/string-util/string-util.library";

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
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);
  const exchangeReturnReasonValueItems = useExchangeReturnReasonValueItems();
  const [reasonList, setReasonList] = useState<string[]>([]);

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

    const reasonList = getReasonList();
    if (reasonList.length > 0) {
      setReasonList(reasonList);
    } else {
      disposeEmptyReasonList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const disposeEmptyReasonList = useCallback(() => {
    setGlobalModalDefaultModalItem({
      titleStyleA: {
        component: <>안내</>,
      },
      contentComponent: <>교환/반품 사유를 선택해주세요.</>,
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
    });
    const reasonUrl = router.asPath.split('?')[0].split('/apply')[0] + '/reason';
    router.push(reasonUrl, undefined, { shallow: true });
  }, [router, setGlobalModalDefaultModalItem]);

  const getReasonList = useCallback(() => {
    const reasonList: string[] = [];

    if (typeof router.query.reasonList === 'string' && router.query.reasonList?.trim() !== '') {
      reasonList.push(router.query.reasonList);
    } else if (Array.isArray(router.query.reasonList)) {
      router.query.reasonList.forEach((item) => {
        if (typeof item === 'string' && item?.trim() !== '') {
          reasonList.push(item);
        }
      });
    }

    return reasonList;
  }, [router.query.reasonList]);

  const preButtonClick = useCallback(() => {
    const reasonList = getReasonList();
    let reasonUrl = router.asPath.split('?')[0].split('/apply')[0] + '/reason';
    if (reasonList.length > 0) {
      const query = {
        reasonList: reasonList,
      };
      reasonUrl += getNextRouterQueryToUrlQueryString(query);
    }
    router.push(reasonUrl, undefined, { shallow: true });
  }, [getReasonList, router]);

  const applyButtonClick = useCallback(() => {

  }, []);

  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>교환/반품 신청</>,
          }} />
        <ContentArticle>
          <List __width="100%" __direction="vertical" __defaultItemMarginBottom="24px">
            <ListItem>
              <span style={{ fontSize: '0.85rem', color: '#374553', fontWeight: 'bold' }}>선택한 상품 1건</span>
            </ListItem>
            <ListItem __marginBottom="11px">
              <span style={{ fontSize: '0.85rem', color: '#1e2238', fontWeight: 'normal' }}>
                페르마 플러스 드라이버 헤드 (9.5도 단품) 두줄의경우
              </span>
            </ListItem>
            <ListItem>
              <BothSidebox
                __leftComponent={<>
                  <div className={[
                      styles['product-image']
                    ].join(' ')}>
                    <Image
                      src="https://cdn.pixabay.com/photo/2012/04/13/00/37/golf-31340__480.png"
                      alt="상품 이미지"
                      title="상품 이미지"
                      layout="fill"
                      objectFit="contain" />
                  </div>
                </>}
                __rightComponent={<>
                  <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold' }}>
                    51,600원
                  </span>
                </>} />
            </ListItem>
            <ListItem>
              <EmptyRow __style={{ height: '1px', backgroundColor: '#e9ebee' }} />
            </ListItem>
            <ListItem>
              <span style={{ fontSize: '0.85rem', color: '#374553', fontWeight: 'bold' }}>취소 사유</span>
            </ListItem>
            <ListItem __marginBottom="0">
              <span style={{ fontSize: '0.85rem', color: '#1e2238', fontWeight: 'normal' }}>
                {
                  reasonList.map((x, index) => {
                    return (
                      <div key={index}>
                        {exchangeReturnReasonValueItems.find(k => k.value === x)?.text}
                      </div>
                    );
                  })
                }
              </span>
            </ListItem>
          </List>
        </ContentArticle>

        <ContentArticle>
          <Titlebox
            __titleStyleA={{
              component: <>어떤 해결방법을 원하세요?</>
            }} />
          <List __width="100%" __direction="vertical" __defaultItemMarginBottom="28px">
            <ListItem>
              <Checkbox
                __name="exchange-or-return-check-box"
                __value="EXCHANGE"
                __checkMode="single"
                __checkState="none-checked"
                __onChange={(changeInfo) => {  }}>
                교환
              </Checkbox>
            </ListItem>
            <ListItem __marginBottom="0">
              <Checkbox
                __name="exchange-or-return-check-box"
                __value="RETURN"
                __checkMode="single"
                __checkState="none-checked"
                __onChange={(changeInfo) => {  }}>
                반품
              </Checkbox>
            </ListItem>
          </List>
        </ContentArticle>

        <ContentArticle>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponentStyle={{ width: 'calc(100% - 98px)' }}
            __rightComponentStyle={{ width: '98px' }}
            __leftComponent={<>
              <span style={{ fontSize: '0.95rem', color: '#374553', fontWeight: 'bold', letterSpacing: '-0.03rem' }}>
                배송 정보를 확인해주세요
              </span>
            </>}
            __rightComponent={<>
              <Button __buttonStyle="gray-stroke-radius">
                변경하기
              </Button>
            </>} />
          <EmptyRow __style={{ height: '8px' }} />
          <List __width="100%" __direction="vertical" __defaultItemMarginBottom="10px">
            <ListItem>
              <span style={{ fontSize: '0.8rem', color: '#374553', fontWeight: 'bold', letterSpacing: '-0.03rem' }}>
                홍길동
              </span>
            </ListItem>
            <ListItem __marginBottom="0">
              <span style={{ fontSize: '0.8rem', color: '#1e2238', fontWeight: 'normal', letterSpacing: '-0.03rem' }}>
                (00000) 서울특별시 강남구 역삼동 12345 123<br />
                010-0000-0000
              </span>
            </ListItem>
          </List>
        </ContentArticle>

        <BothSidebox
          __leftComponent={<>
            <Button __buttonStyle="gray-solid" __onClick={preButtonClick}>
              이전
            </Button>
          </>}
          __rightComponent={<>
            <Button __onClick={applyButtonClick}>
              신청
            </Button>
          </>} />
      </WindowSizeContainer>
    </>
  );
};

export default ExchangeReturnApplyPage;
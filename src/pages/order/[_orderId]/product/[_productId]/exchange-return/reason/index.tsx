import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../../../../../../atoms/global-modal-default.atom";
import AccessTokenCheck from "../../../../../../../components/auth/access-token-check/access-token-check.component";
import Button from "../../../../../../../components/forms/button/button.component";
import Checkbox from "../../../../../../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../../../../../../components/forms/checkbox/checkbox.interface";
import ContentArticle from "../../../../../../../components/layouts/content-article/content-article.component";
import List, { ListItem } from "../../../../../../../components/layouts/list/list.component";
import Titlebox from "../../../../../../../components/layouts/title-box/title-box.component";
import Topbar from "../../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../../components/layouts/window-size-container/window-size-container.component";
import { useExchangeReturnReasonValueItems } from "../../../../../../../hooks/use-api-hook/use-api.hook";
import { getNextRouterQueryToUrlQueryString } from "../../../../../../../librarys/string-util/string-util.library";
import styles from './index.module.scss';

const ExchangeReturnReasonPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 교환/반품 사유선택</title>
        <meta name="description" content="고필드 교환/반품 사유선택 페이지 입니다." />
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
  const [reasonList, setReasonList] = useState<string[]>([]);
  const exchangeReturnReasonValueItems = useExchangeReturnReasonValueItems();
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);

  const exchangeReturnReasonCheckboxChanged = useCallback((checkboxChangeInfo: ICheckbox.CheckboxChangeInfo) => {
    setReasonList([checkboxChangeInfo.value]);
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const query = { ...router.query };
    query.reasonList = reasonList;
    const urlQueryString = getNextRouterQueryToUrlQueryString(query);
    router.push(router.asPath.split('?')[0] + urlQueryString, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasonList]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    let reasonList = router.query.reasonList;
    if (typeof reasonList === 'string') {
      reasonList = [reasonList];
    }

    if (reasonList === undefined) {
      return;
    }

    setReasonList(reasonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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

  const nextButtonClick = useCallback(() => {
    if (reasonList.length === 0) {
      setGlobalModalDefaultModalItem({
        titleStyleA: {
          component: <>안내</>,
        },
        contentComponent: <>교환/반품 사유를 선택해주세요.</>,
        negativeButtonState: 'hide',
        positiveButtonState: 'show',
      });
      return;
    }

    // ..
    const applyUrl = router.asPath.split('?')[0].split('/reason')[0] + '/apply';
    const query = {
      reasonList: reasonList,
    };
    const urlQueryString = getNextRouterQueryToUrlQueryString(query);
    router.push(applyUrl + urlQueryString, undefined, { shallow: true });
  }, [reasonList, router, setGlobalModalDefaultModalItem]);

  return (
    <>
      <WindowSizeContainer>
        <Topbar
          __layoutTypeA={{
            titleComponent: <>교환/반품 신청</>,
          }} />
        <ContentArticle
          __bgOpacityZero={true}>
          <Titlebox
            __titleStyleA={{
              component: <>사유를 선택해주세요</>
            }} />
          <List __width="100%" __direction="vertical" __defaultItemMarginBottom="24px">
            {
              exchangeReturnReasonValueItems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Checkbox 
                      __checkMode="single" 
                      __name="exchange-return-reason-checkbox" 
                      __value={item.value} 
                      __checkState={reasonList.includes(item.value) ? 'checked' : 'none-checked'}
                      __onChange={exchangeReturnReasonCheckboxChanged}>{item.text}</Checkbox>
                  </ListItem>
                )
              })
            }
          </List>
          <div className={[
              styles['button-row']
            ].join(' ')}>
            <Button __onClick={nextButtonClick}>
              다음
            </Button>
          </div>
        </ContentArticle>
      </WindowSizeContainer>
    </>
  );
};

export default ExchangeReturnReasonPage;
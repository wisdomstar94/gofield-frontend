import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../../../../../components/auth/access-token-check/access-token-check.component";
import BothSidebox from "../../../../../../../components/layouts/both-side-box/both-side-box.component";
import ContentArticle from "../../../../../../../components/layouts/content-article/content-article.component";
import List, { ListItem } from "../../../../../../../components/layouts/list/list.component";
import Topbar from "../../../../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../../../../components/layouts/window-size-container/window-size-container.component";
import styles from './index.module.scss';
import Image from 'next/image';
import EmptyRow from "../../../../../../../components/layouts/empty-row/empty-row.component";
import { useRecoilState } from "recoil";
import { globalModalDefaultModalItemAtom } from "../../../../../../../atoms/global-modal-default.atom";
import Titlebox from "../../../../../../../components/layouts/title-box/title-box.component";
import Checkbox from "../../../../../../../components/forms/checkbox/checkbox.component";
import Button from "../../../../../../../components/forms/button/button.component";
import { getNextRouterQueryToUrlQueryString } from "../../../../../../../librarys/string-util/string-util.library";
import ModalAddressManage from "../../../../../../../components/modals/modal-address-manage/modal-address-manage.component";
import { IModalAddressManage } from "../../../../../../../components/modals/modal-address-manage/modal-address-manage.interface";
import BottomFixedOrRelativeBox from "../../../../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import ProductRowItem3 from "../../../../../../../components/boxes/product-row-item3/product-row-item3.component";
import { ICheckbox } from "../../../../../../../components/forms/checkbox/checkbox.interface";
import useExchangeReturnReasonListQuery from "../../../../../../../hooks/use-queries/use-exchange-return-reason-list.query";

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
  const exchangeReturnReasonListQuery = useExchangeReturnReasonListQuery();
  const [reasonList, setReasonList] = useState<string[]>([]);
  const modalAddressManageComponentRef = useRef<IModalAddressManage.RefObject>(null);

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
    router.push(reasonUrl);
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

  const exchangeOrReturnCheckboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {

  }, []);

  const preButtonClick = useCallback(() => {
    history.back();
  }, []);

  const applyButtonClick = useCallback(() => {

  }, []);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>교환/반품 신청</>,
          }} />
        
        <div className="block mx-6 mt-4">
          <div className="block font-bold text-base">
            선택한 상품 1건
          </div>
        </div>
        <ProductRowItem3 __isTopRowShow={false} />

        <div className="block mx-6 mt-4">
          <div className="font-bold text-sm text-black-a mb-1">
            교환/빈품 사유
          </div>
          <div className="font-normal text-sm text-gray-b">
            { reasonList.map((item) => exchangeReturnReasonListQuery.data?.find(x => x.value === item)?.text) }
          </div>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          어떤 해결 방법을 원하세요?
        </div>
        
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="exchange" __checkState="none-checked" __onChange={exchangeOrReturnCheckboxChange}>
            교환
          </Checkbox>
        </div>
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="return" __checkState="none-checked" __onChange={exchangeOrReturnCheckboxChange}>
            반품
          </Checkbox>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          배송 정보를 확인해 주세요
        </div>

        <div className="font-normal text-sm text-black-a mx-6 mb-1">
          구민성
        </div>
        <div className="font-normal text-sm text-gray-b mx-6 mb-1">
          (00000) 서울특별시 상남구 역삼로 434, 302호
        </div>
        <div className="font-normal text-sm text-gray-b mx-6 mb-4">
          010-0000-0000
        </div>
        <div className="mx-6 mb-4">
          <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '6px 10px' }}>주소 변경하기</Button>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke">이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid">신청하기</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>

      </WindowSizeContainer>
      
      <ModalAddressManage ref={modalAddressManageComponentRef} />
    </>
  );
};

export default ExchangeReturnApplyPage;
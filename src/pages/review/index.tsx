import { NextPage } from "next";
import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import Image from 'next/image';
import ProfileInfoBox from "../../components/boxes/profile-info-box/profile-info-box.component";
import MenuRowList from "../../components/boxes/menu-row-list/menu-row-list.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import StrokeTabButtonBox from "../../components/boxes/stroke-tab-button-box/stroke-tab-button-box.component";
import { useCallback, useEffect, useRef, useState } from "react";
import { ICommon } from "../../interfaces/common/common.interface";
import styles from './index.module.scss';
import ProductRowItem3 from "../../components/boxes/product-row-item3/product-row-item3.component";
import { getClasses, getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";
import useOrderReviewWritableListApi from "../../hooks/use-apis/use-order-review-writable-list.api";
import { IReview } from "../../interfaces/review/review.interface";
import { useRouter } from "next/router";
import { IScrollCheckHook } from "../../hooks/use-scroll-check/use-scroll-check.interface";
import useOrderReviewHistoryListApi from "../../hooks/use-apis/use-order-review-history-list.api";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 리뷰 관리</title>
        <meta name="description" content="고필드 리뷰 관리 입니다." />
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
  const orderReviewWritableListApi = useOrderReviewWritableListApi();
  const orderReviewHistoryListApi = useOrderReviewHistoryListApi();
  const [tabButtonValueItems, setTabButtonValueItems] = useState<ICommon.ValueItem[]>([
    { text: '리뷰작성', value: 'review-list' },
    { text: '리뷰내역', value: 'review-history' },
  ]);
  const [selectedTabValue, setSelectedTabValue] = useState('review-list');

  const isGettingReviewWritableListRef = useRef(false);
  const isNoneMoreDataReviewWritableRef = useRef(false);
  const latestReviewWritableListPage = useRef(0);
  const [reviewWritableListOptions, setReviewWritableListOptions] = useState<IReview.ReviewWritableListOptions>({
    page: '1',
    size: '10',
    list: [],
  });

  const isGettingReviewHistoryListRef = useRef(false);
  const isNoneMoreDataReviewHistoryRef = useRef(false);
  const latestReviewHistoryListPage = useRef(0);
  const [reviewHistoryListOptions, setReviewHistoryListOptions] = useState<IReview.ReviewHistoryListOptions>({
    page: '1',
    size: '10',
    list: [],
  });

  const getReviewWritableList = useCallback((options: IReview.ReviewWritableListOptions) => {
    if (isGettingReviewWritableListRef.current) return;
    if (Number(options.page) === latestReviewWritableListPage.current) return;

    isGettingReviewWritableListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
    };
    orderReviewWritableListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }
      latestReviewWritableListPage.current = Number(options.page);

      if (response.data.data.list.length === 0) {
        isNoneMoreDataReviewWritableRef.current = true;
        return;
      } else if (response.data.data.list.length < Number(options.size)) {
        isNoneMoreDataReviewWritableRef.current = true;
      }

      setReviewWritableListOptions(prev => {
        return {
          ...prev,
          list: prev.list.concat(response.data.data.list),
        };
      });
    }).finally(() => {
      isGettingReviewWritableListRef.current = false;
    });
  }, [orderReviewWritableListApi]);

  const getReviewHistoryList = useCallback((options: IReview.ReviewHistoryListOptions) => {
    if (isGettingReviewHistoryListRef.current) return;
    if (Number(options.page) === latestReviewHistoryListPage.current) return;

    isGettingReviewHistoryListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
    };
    orderReviewHistoryListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }
      latestReviewHistoryListPage.current = Number(options.page);

      if (response.data.data.list.length === 0) {
        isNoneMoreDataReviewHistoryRef.current = true;
        return;
      } else if (response.data.data.list.length < Number(options.size)) {
        isNoneMoreDataReviewHistoryRef.current = true;
      }

      setReviewHistoryListOptions(prev => {
        return {
          ...prev,
          list: prev.list.concat(response.data.data.list),
        };
      });
    }).finally(() => {
      isGettingReviewHistoryListRef.current = false;
    });
  }, [orderReviewHistoryListApi]);

  const onTabClick = useCallback((valueItem: ICommon.ValueItem) => {
    if (valueItem.value === 'review-history') {
      getReviewHistoryList(reviewHistoryListOptions);
    }

    setSelectedTabValue(valueItem.value);
  }, [getReviewHistoryList, reviewHistoryListOptions]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getReviewWritableList(reviewWritableListOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);


  const onScrollReviewList = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingReviewWritableListRef.current || isNoneMoreDataReviewWritableRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      const nextPage = Number(reviewWritableListOptions.page) + 1;
      setReviewWritableListOptions((prev) => {
        const newValue = {
          ...prev,
          page: nextPage.toString(),
        };
        getReviewWritableList(newValue);
        return newValue;
      })
    }
  }, [getReviewWritableList, reviewWritableListOptions.page]);

  const onScrollReviewHistory = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingReviewHistoryListRef.current || isNoneMoreDataReviewHistoryRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      const nextPage = Number(reviewHistoryListOptions.page) + 1;
      setReviewHistoryListOptions((prev) => {
        const newValue = {
          ...prev,
          page: nextPage.toString(),
        };
        getReviewHistoryList(newValue);
        return newValue;
      })
    }
  }, [getReviewHistoryList, reviewHistoryListOptions.page]);
  
  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (selectedTabValue === 'review-list') {
      onScrollReviewList(info);
    } else if (selectedTabValue === 'review-history') {
      onScrollReviewHistory(info);
    }
  }, [onScrollReviewHistory, onScrollReviewList, selectedTabValue]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
        <Topbar
          __layoutTypeB={{
            titleComponent: <>리뷰 관리</>,
            rightComponent: <></>,
          }} />
        <StrokeTabButtonBox
          __isItemBorderTopNone={true}
          __valueItems={tabButtonValueItems}
          __activeValue={selectedTabValue}
          __onTabClick={onTabClick} />
        
        {/* 공통 내용 */}
        <div className={styles['top-notice-area']}>
          <div className={styles['top-row']}>
            리뷰작성 안내
          </div>
          <div className={styles['bottom-row']}>
            - 고필드 스토어의 리뷰는 일반리뷰, 상품 사진 리뷰, 상품 추천 리뷰로 구성되며 각각의 리뷰 작성 시 기준에 맞는 적립금이 지급됩니다. <br />
            - 작성 시 관리자 확인 후 적립금이지급됩니다.<br />
            - 리뷰작성은 구매확정일로부터 90일까지 가능합니다.<br />
          </div>
        </div>

        {/* 리뷰 작성 탭에 해당하는 내용 */}
        <div 
          className={getClasses([
            styles['tab-content-box'],
            selectedTabValue === 'review-list' ? styles['show'] : styles['hide'],
          ])}>
          <div className={styles['list-row']}>
            {
              reviewWritableListOptions.list.map((item, index) => {
                return (
                  <ProductRowItem3 
                    key={item.id}
                    __orderItemId={item.id}
                    __orderNumber={item.orderNumber}
                    __imageUrl={item.thumbnail}
                    __productName={item.name}
                    __optionNames={item.optionName ?? undefined}
                    __qty={item.qty}
                    __price={item.price}
                    __isTopRowShow={false}
                    __purchaseConfirmationDate={item.finsiehdDate}
                    __showButtonTypes={[
                      { buttonType: 'review-write', buttonWidthType: 'full' }
                    ]} />
                );
              })
            }
          </div>
        </div>

        {/* 리뷰 내역 탭에 해당하는 내용 */}
        <div 
          className={getClasses([
            styles['tab-content-box'],
            selectedTabValue === 'review-history' ? styles['show'] : styles['hide'],
          ])}>
          {
            // reviewHistoryListOptions.list.map((item) => {
            //   return (

            //   );
            // })
          }
        </div>
      </WindowSizeContainer>
    </>
  );
};

export default LoginPage;
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../components/auth/access-token-check/access-token-check.component";
import OrderRowItem from "../../../components/boxes/order-row-item/order-row-item.component";
import Topbar from "../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../components/layouts/window-size-container/window-size-container.component";
import useOrderListApi from "../../../hooks/use-apis/use-order-list.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IScrollCheckHook } from "../../../hooks/use-scroll-check/use-scroll-check.interface";
import { IOrder } from "../../../interfaces/order/order.interface";
import { getNextRouterQueryToUrlQueryString } from "../../../librarys/string-util/string-util.library";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 주문목록</title>
        <meta name="description" content="고필드 주문목록 페이지입니다." />
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
  const orderListApi = useOrderListApi();
  const [list, setList] = useState<IOrder.OrderListItem[]>([]);
  const modalAlert = useModalAlert();
  const originTypeRef = useRef('');

  const isNoneMoreDataRef = useRef(false);
  const isGettingListRef = useRef(false);
  const searchOptionRef = useRef({
    page: '1',
    size: '10',
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query.originType === 'string') {
      originTypeRef.current = router.query.originType;
    }

    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getList = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }
    
    const newQuery = {
      ...router.query,
      ...searchOptionRef.current,
    };

    isGettingListRef.current = true;
    orderListApi.getInstance(getNextRouterQueryToUrlQueryString(newQuery)).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '주문 목록을 불러오지 못했습니다.' });
        return;
      }

      if (response.data.data.list.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      }

      if (response.data.data.list.length < Number(searchOptionRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      setList(prev => prev.concat(response.data.data.list));
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [modalAlert, orderListApi, router.query]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      searchOptionRef.current.page = (Number(searchOptionRef.current.page) + 1).toString();
      getList()
    }
  }, [getList]);

  const backButtonClick = useCallback(() => {
    if (originTypeRef.current === 'exchange-or-return') {
      router.push('/');
      return;
    }

    history.back();
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
        <Topbar
          __layoutTypeB={{
            titleComponent: '주문목록',
            rightComponent: <></>,
          }}
          __backButtonClickCallback={backButtonClick} />
        {
          list.length === 0 ? 
          <div className="w-full relative px-6 py-12">
            <div className="w-full box-sizing flex justify-center items-center">
              <span className="text-black-b text-sm">주문 내역이 없습니다.</span>
            </div>
          </div> : <></>
        }
        {
          list.map((item) => {
            return <OrderRowItem key={item.orderNumber} __orderListItem={item} />
          })
        }
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import NotResultBox from "../../components/boxes/not-result-box/not-result-box.component";
import PaginationBox from "../../components/boxes/pagination-box/pagination-box.component";
import { IPaginationBox } from "../../components/boxes/pagination-box/pagination-box.interface";
import CancelReturnExchangeRowItem from "../../components/forms/cancel-return-exchange-row-item/cancel-return-exchange-row-item.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useOrderCancelExchangeReturnListApi from "../../hooks/use-apis/use-order-cancel-exchange-return-list.api";
import { IExchangeReturn } from "../../interfaces/exchange-return/exchange-return.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";

const CancelReturnExchangePage = () => {
  return (
    <>
      <Head>
        <title>고필드 취소/교환/반품 목록</title>
        <meta name="description" content="고필드 취소/교환/반품 목록 페이지 입니다." />
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
  const isGettingListRef = useRef(false);
  const paginationBoxRef = useRef<IPaginationBox.RefObject>(null);
  const orderCancelExchangeReturnListApi = useOrderCancelExchangeReturnListApi();
  const [listOptions, setListOptions] = useState<IExchangeReturn.CancelExchangeReturnListOptions>({
    page: '1',
    size: '4',
    list: [],
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getList(listOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getList = useCallback((options: IExchangeReturn.CancelExchangeReturnListOptions) => {
    if (isGettingListRef.current) {
      return;
    }
    isGettingListRef.current = true;
    const query = {
      page: options.page,
      size: options.size,
    };
    orderCancelExchangeReturnListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setListOptions(prev => {
        const newValue = {
          ...prev,
          list: response.data.data.list,
        };
        return newValue;
      });
      paginationBoxRef.current?.setPage(response.data.data.page);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [orderCancelExchangeReturnListApi]);

  const onPageClick = useCallback((page: number) => {
    setListOptions(prev => {
      const newValue = {
        ...prev,
        page: page.toString(),
      };
      getList(newValue);
      return newValue;
    });
  }, [getList]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>취소/반품/교환</>,
          }} />

        {
          listOptions.list.length === 0 ?
          <>
            <NotResultBox>
              조회 결과가 없습니다.
            </NotResultBox>
          </> :
          <>
            {
              listOptions.list.map((groupItem) => {
                return groupItem.cancelItems.map((item) => {
                  return (
                    <CancelReturnExchangeRowItem
                      __groupItem={groupItem}
                      __item={item}
                      key={item.id} 
                      />
                  ); 
                })
              })
            }

            <div className="w-full mb-2"></div>
          </>
        }

        <div className="w-full flex flex-wrap justify-center" style={{
          display: listOptions.list.length > 0 ? undefined : 'none',
        }}>
          <PaginationBox 
            ref={paginationBoxRef}
            __onPageClick={onPageClick} />
        </div>  

        <div className="w-full h-20"></div>

        <BottomMenuBar __activeMenuId="my-page" />
      </WindowSizeContainer>
    </>
  );
};

export default CancelReturnExchangePage;
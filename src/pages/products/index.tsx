import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../components/boxes/basket-form-box/basket-form-box.component";
import ProductColumnItem from "../../components/boxes/product-column-item/product-column-item.component";
import SearchFormBox from "../../components/boxes/search-form-box/search-form-box.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import ProductGroupColumnItem from "../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../components/modals/modal-search/modal-search.component";
import SvgCloseIcon from "../../components/svgs/svg-close-icon/svg-close-icon.component";
import useSearchListApi from "../../hooks/use-apis/use-search-list.api";
import useModalAlert from "../../hooks/use-modals/use-modal-alert.modal";
import useRender from "../../hooks/use-render/use-render.hook";
import { IScrollCheckHook } from "../../hooks/use-scroll-check/use-scroll-check.interface";
import { IItem } from "../../interfaces/item/item.interface";
import { getNextRouterQueryToUrlQueryString } from "../../librarys/string-util/string-util.library";
import styles from './index.module.scss';

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 상품검색 목록</title>
        <meta name="description" content="고필드 상품검색 목록 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <AccessTokenCheck __checkTarget="signup-complete-user"> */}
      <PageContents />
      {/* </AccessTokenCheck> */}
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const modalAlert = useModalAlert();
  const render = useRender();
  // const [keyword, setkeyword] = useState('');

  const isGettingListRef = useRef(false);
  const isNoneMoreDataRef = useRef(false);
  const searchInfoRef = useRef({
    page: '1',
    size: '20',
    keyword: '',
  });

  const [totalCount, setTotalCount] = useState(0);
  const [list, setList] = useState<IItem.ProductRowItem[]>([]);

  const searchListApi = useSearchListApi();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query.keyword === 'string') {
      searchInfoRef.current.keyword = router.query.keyword;
    }

    getList();

    () => {
      setList([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getList = useCallback(() => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (searchInfoRef.current.keyword === '' || typeof searchInfoRef.current.keyword !== 'string') {
      modalAlert.show({ title: '안내', content: '검색할 키워드가 없습니다.' });
      return;
    }

    isGettingListRef.current = true;
    searchListApi.getInstance(getNextRouterQueryToUrlQueryString({ ...router.query, ...searchInfoRef.current })).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '검색 리스트를 가져오는 도중 실패하였습니다.' });
        return;
      }

      if (response.data.data.list.length === 0) {
        isNoneMoreDataRef.current = true;
        return;
      } else if (response.data.data.list.length < Number(searchInfoRef.current.size)) {
        isNoneMoreDataRef.current = true;
      }

      setList(list.concat(response.data.data.list));
      setTotalCount(response.data.data.totalCount);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [list, modalAlert, router.query, searchListApi]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingListRef.current || isNoneMoreDataRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      searchInfoRef.current.page = (Number(searchInfoRef.current.page) + 1).toString();
      getList()
    }
  }, [getList]);

  const productItemClick = useCallback((item: IItem.ProductRowItem) => {
    if (item.classification === 'NEW') {
      router.push('/product/new/' + item.itemNumber);
    } else {
      router.push('/product/old/' + item.itemNumber);
    }
  }, [router]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff" __onScroll={onScroll}>
        <Topbar
          __layoutTypeB={{
            titleComponent: <>{ searchInfoRef.current.keyword }</>,
            rightComponent: <><div className={styles['close-button']} onClick={() => { history.back() }}><SvgCloseIcon /></div></>,
          }} />
        <Article>
          <div style={{ width: '100%', fontSize: '1rem', marginBottom: '10px', fontWeight: 'bold' }}>상품</div>
          <BothSidebox
            __style={{ marginBottom: '10px' }}
            __leftComponent={<><div className={styles['count-text']}>상품 <b>{ totalCount }</b>개</div></>}
            __rightComponent={<>
              {/* <ViewFilterBox __optionTypes={["order-by"]} /> */}
            </>} />
          <GridList __columnCount={2}>
            {
              list.map((item) => {
                return (
                  <ProductColumnItem
                    key={item.itemNumber}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={item.brandName}
                    __price={item.price}
                    __productNameComponent={item.name}
                    __onClick={() => productItemClick(item)} />
                );
              })
            }
          </GridList>
        </Article>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
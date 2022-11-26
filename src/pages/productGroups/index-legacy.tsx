import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../components/boxes/basket-form-box/basket-form-box.component";
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
import styles from './index.module.scss';

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 상품검색 목록</title>
        <meta name="description" content="고필드 상품검색 목록 페이지입니다." />
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
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (typeof router.query.searchValue === 'string') {
      setSearchValue(router.query.searchValue);
    }
  }, [router.query]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: <>{ searchValue }</>,
            rightComponent: <><div className={styles['close-button']} onClick={() => { history.back() }}><SvgCloseIcon /></div></>,
          }} />
        <Article>
          <div style={{ width: '100%', fontSize: '1rem', marginBottom: '10px', fontWeight: 'bold' }}>상품</div>
          <BothSidebox
            __style={{ marginBottom: '10px' }}
            __leftComponent={<><div className={styles['count-text']}>상품 <b>NNN</b>개</div></>}
            __rightComponent={<><ViewFilterBox __optionTypes={["order-by"]} /></>} />
          <GridList __columnCount={2}>
            
          </GridList>
        </Article>
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
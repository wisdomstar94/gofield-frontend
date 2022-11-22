import Head from "next/head";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../components/boxes/basket-form-box/basket-form-box.component";
import SearchFormBox from "../../components/boxes/search-form-box/search-form-box.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import ModalSearch from "../../components/modals/modal-search/modal-search.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 상품검색</title>
        <meta name="description" content="고필드 상품검색 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <SearchFormBox />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
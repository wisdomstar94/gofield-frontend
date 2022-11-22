import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import BasketFormBox from "../../components/boxes/basket-form-box/basket-form-box.component";
import BasketProductRowItem from "../../components/boxes/basket-product-row-item/basket-product-row-item.component";
import ViewFilterBox from "../../components/boxes/view-filter-box/view-filter-box.component";
import Checkbox from "../../components/forms/checkbox/checkbox.component";
import { ICheckbox } from "../../components/forms/checkbox/checkbox.interface";
import ProductGroupColumnItem from "../../components/forms/product-group-column-item/product-group-column-item.component";
import Article from "../../components/layouts/article/article.component";
import BothSidebox from "../../components/layouts/both-side-box/both-side-box.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import GridList from "../../components/layouts/grid-list/grid-list.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 장바구니</title>
        <meta name="description" content="고필드 장바구니 페이지입니다." />
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
        <Topbar
          __layoutTypeB={{
            titleComponent: '장바구니',
            rightComponent: <></>,
            // searchButtonClickCallback: searchButtonClick,
          }} />
        <BasketFormBox />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
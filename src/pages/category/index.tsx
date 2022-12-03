import Head from "next/head";
import { useRouter } from "next/router";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowItem from "../../components/boxes/menu-row-item/menu-row-item.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";
import useCategoryListQuery from "../../hooks/use-queries/use-category-list.query";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 카테고리</title>
        <meta name="description" content="고필드 카테고리 페이지입니다." />
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
  const categoryListQuery = useCategoryListQuery();

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '카테고리'
          }}/>
        {
          categoryListQuery.data?.map((item, index) => {
            return <MenuRowItem key={item.value} __onClick={() => { router.push('/productGroups/' + item.value); }}>{ item.text }</MenuRowItem>
          })
        }
        <BottomMenuBar __activeMenuId="category" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
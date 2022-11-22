import Head from "next/head";
import { useRouter } from "next/router";
import AccessTokenCheck from "../../components/auth/access-token-check/access-token-check.component";
import MenuRowItem from "../../components/boxes/menu-row-item/menu-row-item.component";
import BottomMenuBar from "../../components/layouts/bottom-menu-bar/bottom-menu-bar.component";
import Topbar from "../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../components/layouts/window-size-container/window-size-container.component";

const ProductNewPage = () => {
  return (
    <>
      <Head>
        <title>고필드 - 카테고리</title>
        <meta name="description" content="고필드 카테고리 페이지입니다." />
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

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '카테고리'
          }}/>
        <MenuRowItem __onClick={() => { router.push('/productGroups/golf'); }}>골프</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/bicycle'); }}>자전거</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/health'); }}>헬스</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/mountain'); }}>등산</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/tennis'); }}>테니스</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/soccer'); }}>축구</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/baseball'); }}>야구</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/swimming'); }}>수영</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/clothing'); }}>의류</MenuRowItem>
        <MenuRowItem __onClick={() => { router.push('/productGroups/etc'); }}>기타</MenuRowItem>

        <BottomMenuBar __activeMenuId="category" />
      </WindowSizeContainer>
    </>
  );
};

export default ProductNewPage;
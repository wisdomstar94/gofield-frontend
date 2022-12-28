import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component"
import Head from "next/head";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import ProductDetailFormBox from "../../../../components/boxes/product-detail-form-box/product-detail-form-box.component";
import { INextjsPage } from "../../../../interfaces/nextjs-page/nextjs-page.interface";
import axios from 'axios';
import Config from "../../../../configs/config.export";
import { IItem } from "../../../../interfaces/item/item.interface";
import { IResponse } from "../../../../interfaces/response/response.interface";
import { GetServerSidePropsContext } from "next";
import { getAxiosInstance } from "../../../../librarys/axios-util/axios-util.library";

const ProductNewPage = (props: INextjsPage.ProductDetailPageProps) => {
  return (
    <>
      <Head>
        <title>고필드 - { props.serverDetailInfo.name }</title>
        <meta property="og:title" content={`(${props.serverDetailInfo.brandName}) ${props.serverDetailInfo.name}`}></meta>
        <meta property="og:image" content={ props.serverDetailInfo.thumbnail }></meta>
        <meta name="description" content={`고필드 ${props.serverDetailInfo.name} 상세정보 페이지입니다.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="not-login-or-sign-true">
        <PageContents { ...props } />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = (props: INextjsPage.ProductDetailPageProps) => {
  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeB={{
            titleComponent: '',
            // searchButtonClickCallback: searchButtonClick,
          }} />
        <ProductDetailFormBox 
          __productType="old"
          __detailInfo={props.serverDetailInfo} />
      </WindowSizeContainer>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const itemNumber = context.query._itemNumber; 

  try {
    const res = await getAxiosInstance<IResponse.CommonResponse<IItem.ItemDetailInfoApiData>>({
      method: 'get',
      url: Config().api.item._ + '/' + itemNumber,
      isAuth: true,
      context,
    });

    return {
      props: {
        serverDetailInfo: res.data.data,
      },
    };
  } catch(error) {
    return {
      props: {
        serverDetailInfo: undefined,
      },
    };
  }
}

export default ProductNewPage;
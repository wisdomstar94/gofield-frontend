import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import AccessTokenCheck from '../components/auth/access-token-check/access-token-check.component';
import BannerBox from '../components/boxes/banner-box/banner-box.component';
import CategoryButtonListBox from '../components/boxes/category-button-list-box/category-button-list-box.component';
import ProductGroupColumnItem from '../components/forms/product-group-column-item/product-group-column-item.component';
import Article from '../components/layouts/article/article.component';
import BothSidebox from '../components/layouts/both-side-box/both-side-box.component';
import HorizontalScrollBox from '../components/layouts/horizontal-scroll-box/horizontal-scroll-box.component';
import Topbar from '../components/layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../components/layouts/window-size-container/window-size-container.component';
import BottomMenuBar from '../components/layouts/bottom-menu-bar/bottom-menu-bar.component';
import EmptyRow from '../components/layouts/empty-row/empty-row.component';
import ArticleTopRow from '../components/layouts/article-top-row/article-top-row.component';
import TextProductTypeTitle from '../components/texts/text-product-type-title/text-product-type-title.component';
import TextMoreViewButton from '../components/texts/text-more-view-button/text-more-view-button.component';
import EmptyColumn from '../components/layouts/empty-column/empty-column.component';
import { useRouter } from 'next/router';
import useMainItemListQuery from '../hooks/use-queries/use-main-item.query';
import ProductColumnItem from '../components/boxes/product-column-item/product-column-item.component';
import useItemListApi from '../hooks/use-apis/use-item-list.api';
import { IItem } from '../interfaces/item/item.interface';
import { getNextRouterQueryToUrlQueryString } from '../librarys/string-util/string-util.library';
import GridList from '../components/layouts/grid-list/grid-list.component';
import { IScrollCheckHook } from '../hooks/use-scroll-check/use-scroll-check.interface';
import useMainBannerListQuery from '../hooks/use-queries/use-main-banner-list.query';
import Image from 'next/image';
import ImageBox from '../components/boxes/image-box/image-box.component';
import useImageManager from '../hooks/use-image-manager/use-image-manager.hook';
import useClientManager from '../hooks/use-client-manager/use-client-manager.hook';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드(gofield) - 메인</title>
        <meta name="title" content="고필드(gofield) - 메인" />
        <meta name="description" content="고필드(gofield) 메인 페이지입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="not-login-or-sign-true">
        <PageContents />
      </AccessTokenCheck>
    </>
  )
};

const PageContents = () => {
  const router = useRouter();
  const imageManager = useImageManager();
  const clientManager = useClientManager();
  const itemListApi = useItemListApi();
  const mainItemListQuery = useMainItemListQuery();
  const mainBannerListQuery = useMainBannerListQuery();

  const isGettingUsedItemListRef = useRef(false);
  const isNoneMoreDataUsedItemListRef = useRef(false);
  const latestedPageRef = useRef(0);
  const [usedItemListOptions, setUsedItemListOptions] = useState<IItem.UsedItemListOptions>({
    page: '1',
    size: '10',
    // classification: 'USED',
    sort: 'NEWEST',
    list: [],
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    getUsedItemList(usedItemListOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]); 

  const getUsedItemList = useCallback((options: IItem.UsedItemListOptions) => {
    if (isGettingUsedItemListRef.current || isNoneMoreDataUsedItemListRef.current) {
      return;
    }
    if (options.sort === '') return;
    if (latestedPageRef.current === Number(options.page)) return;

    isGettingUsedItemListRef.current = true;
    // console.log('getList.options', options);
    const query = {
      page: options.page,
      size: options.size,
      sort: options.sort,
      classification: 'USED',
    };
    itemListApi.getInstance(getNextRouterQueryToUrlQueryString(query)).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      if (response.data.data.length === 0) {
        isNoneMoreDataUsedItemListRef.current = true;
        return;
      } else if (response.data.data.length < Number(usedItemListOptions.size)) {
        isNoneMoreDataUsedItemListRef.current = true;
      }

      // setList(list.concat(response.data.data));
      setUsedItemListOptions((prev) => {
        const newValue = {
          ...prev,
          list: prev.list.concat(response.data.data),
        };
        return newValue;
      });
    }).finally(() => {
      isGettingUsedItemListRef.current = false;
      latestedPageRef.current = Number(options.page);
    });
  }, [itemListApi, usedItemListOptions.size]);

  const usedProductColumnItemClick = useCallback((item: IItem.ProductRowItem) => {
    router.push('/product/old/' + item.itemNumber);
  }, [router]);

  const onScroll = useCallback((info: IScrollCheckHook.ScrollInfo) => {
    if (isGettingUsedItemListRef.current || isNoneMoreDataUsedItemListRef.current) {
      return;
    }

    if (info.isLastScrollArea) {
      const nextPage = Number(usedItemListOptions.page) + 1;
      setUsedItemListOptions((prev) => {
        const newValue = {
          ...prev,
          page: nextPage.toString(),
        };
        getUsedItemList(newValue);
        return newValue;
      })
    }
  }, [getUsedItemList, usedItemListOptions.page]);

  return (
    <>
      <WindowSizeContainer __bgColor="#f7f8f9" __onScroll={onScroll}>
        <Topbar
          __layoutTypeB={{

          }}
           />
        <BannerBox
          __bannerItems={mainBannerListQuery.data?.topBannerList} />
        <CategoryButtonListBox __style={{ marginBottom: '8px' }} />
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0', minHeight: '360px' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>인기 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="/popular-productGroups">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <div className="w-full h-3"></div>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              mainItemListQuery.data?.popularBundleList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px', marginRight: '12px' }}
                    __onClick={() => { 
                      console.log('...왜?');
                      router.push('/productGroup/' + item.id);
                    }}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={<>{item.brandName}</>}
                    __productNameComponent={<>{item.name}</>}
                    __newProductPrice={item.newLowestPrice} 
                    __oldProductPrice={item.usedLowestPrice}
                    __reviewCount={item.reviewCount}
                    __reviewStarPoint={item.reviewScore} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article>
        {
          typeof mainBannerListQuery.data?.middleBannerList[0]?.thumbnail === 'string' ?
          <div className="block" onClick={() => {
            if (mainBannerListQuery.data?.middleBannerList[0].linkUrl === null || mainBannerListQuery.data?.middleBannerList[0].linkUrl === '') {
              return;
            }
            window.open(mainBannerListQuery.data?.middleBannerList[0].linkUrl);
          }}>
            <div className="next-image-wrapper">
              <ImageBox
                mode="pure"
                priority={true}
                src={imageManager.getImageUrl(
                  mainBannerListQuery.data?.middleBannerList[0].thumbnail, 
                  `?s=${clientManager.getWindowSizeContainerWidth()}x${clientManager.getHeightWithWidthRatio(clientManager.getWindowSizeContainerWidth(), 16, 9)}&t=crop&q=100&f=webp`
                )}
                alt={mainBannerListQuery.data?.middleBannerList[0].description ?? '배너 이미지'}
                title={mainBannerListQuery.data?.middleBannerList[0].title ?? '배너 이미지'}
                fill={true}
                sizes="100%"
                draggable={false}
                style={{
                  objectFit: 'cover',
                }} />
            </div>
          </div> : 
          <></>
        }
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>추천 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="/recommend-productGroups">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <div className="w-full h-3"></div>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              mainItemListQuery.data?.recommendBundleList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px', marginRight: '12px' }}
                    __onClick={() => { router.push('/productGroup/' + item.id) }}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={<>{item.brandName}</>}
                    __productNameComponent={<>{item.name}</>}
                    __newProductPrice={item.newLowestPrice} 
                    __oldProductPrice={item.usedLowestPrice}
                    __reviewCount={item.reviewCount}
                    __reviewStarPoint={item.reviewScore} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article>
        {
          typeof mainBannerListQuery.data?.middleBannerList[1]?.thumbnail === 'string' ?
          <div className="block" onClick={() => {
            if (mainBannerListQuery.data?.middleBannerList[1].linkUrl === null || mainBannerListQuery.data?.middleBannerList[0].linkUrl === '') {
              return;
            }
            window.open(mainBannerListQuery.data?.middleBannerList[1].linkUrl);
          }}>
            <div className="next-image-wrapper">
              <ImageBox
                mode="pure"
                priority={true}
                src={imageManager.getImageUrl(
                  mainBannerListQuery.data?.middleBannerList[1].thumbnail, 
                  `?s=${clientManager.getWindowSizeContainerWidth()}x${clientManager.getHeightWithWidthRatio(clientManager.getWindowSizeContainerWidth(), 16, 9)}&t=crop&q=100&f=webp`
                )}
                alt={mainBannerListQuery.data?.middleBannerList[1].description ?? '배너 이미지'}
                title={mainBannerListQuery.data?.middleBannerList[1].title ?? '배너 이미지'}
                fill={true}
                sizes="100%"
                draggable={false}
                style={{
                  objectFit: 'cover',
                }} />
            </div>
          </div> : 
          <></>
        }
        {/* <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>OOO님을 위한 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                <TextMoreViewButton><Link href="#">더보기 &gt;</Link></TextMoreViewButton>
              </>} />
          </ArticleTopRow>
          <div className="w-full h-3"></div>
          <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              mainItemListQuery.data?.categoryBundleList.map((item, index) => {
                return (
                  <ProductGroupColumnItem key={index} __style={{ width: '150px', marginRight: '12px' }}
                    __onClick={() => { router.push('/productGroup/' + item.id) }}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={<>{item.brandName}</>}
                    __productNameComponent={<>{item.name}</>}
                    __newProductPrice={item.newLowestPrice} 
                    __oldProductPrice={item.usedLowestPrice}
                    __reviewCount={item.reviewCount}
                    __reviewStarPoint={item.reviewScore} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox>
        </Article> */}
        <Article __style={{ marginBottom: '8px', padding: '0 0 24px 0' }}>
          <ArticleTopRow>
            <BothSidebox
              __leftComponent={<>
                <TextProductTypeTitle>최근 등록된 중고 상품</TextProductTypeTitle>
              </>}
              __rightComponent={<>
                {/* <TextMoreViewButton><Link href="#">더보기 &gt;</Link></TextMoreViewButton> */}
              </>} />
          </ArticleTopRow>
          <div className="w-full h-6"></div>
          {/* <HorizontalScrollBox>
            <EmptyColumn __style={{ width: '24px' }} />
            {
              mainItemListQuery.data?.classificationItemList.map((item, index) => {
                return (
                  <ProductColumnItem key={index} __style={{ width: '150px', marginRight: '12px' }}
                    __onClick={() => { 
                      if (item.classification === 'NEW') {
                        router.push('/product/new/' + item.itemNumber);
                      } else {
                        router.push('/product/old/' + item.itemNumber);
                      }
                    }}
                    __imageUrl={item.thumbnail}
                    __brandNameComponent={<>{item.brandName}</>}
                    __productNameComponent={<>{item.name}</>}
                    __price={item.price}
                    __tags={item.tags} />
                )
              })
            }
            <EmptyColumn __style={{ width: '24px' }} />
          </HorizontalScrollBox> */}
          <div className="block px-6">
            <GridList>
              {
                usedItemListOptions.list.map((item) => {
                  return (
                    <ProductColumnItem
                      key={item.itemNumber}
                      __itemId={item.id}
                      __isHeart={item.likeId !== null}
                      __imageUrl={item.thumbnail}
                      __tags={item.tags}
                      __onClick={() => usedProductColumnItemClick(item)}
                      __brandNameComponent={<>{ item.brandName }</>}
                      __productNameComponent={<>{ item.name }</>}
                      __isHeartLayout={true}
                      __price={item.price} /> 
                  );
                })
              }
            </GridList>
          </div>
        </Article>
        <EmptyRow __style={{ height: '54px' }} />
        <BottomMenuBar __activeMenuId="home" />
      </WindowSizeContainer>
    </>
  );
};

export default Home

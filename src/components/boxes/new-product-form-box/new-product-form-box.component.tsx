import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgShareIcon from "../../svgs/svg-share-icon/svg-share-icon.component";
import styles from "./new-product-form-box.component.module.scss";
import { INewProductFormBox } from "./new-product-form-box.interface";
import Image from 'next/image';
import { useCallback } from "react";
import HashTagItem from "../hash-tag-item/hash-tag-item.component";
import StrokeTabButtonBox from "../stroke-tab-button-box/stroke-tab-button-box.component";
import { ICommon } from "../../../interfaces/common/common.interface";
import TitleAndContentRowItem from "../title-and-content-row-item/title-and-content-row-item.component";
import ProductDetailImageBox from "../product-detail-image-box/product-detail-image-box.component";
import { getClasses } from "../../../librarys/string-util/string-util.library";

const NewProductFormBox = (props: INewProductFormBox.Props) => {
  const shareButtonClick = useCallback(() => {

  }, []);

  const onTabClick = useCallback((valueItem: ICommon.ValueItem) => {

  }, []);

  return (
    <>
      <SwiperCustom __style={{ height: '360px', borderBottom: '1px solid #e9ebee' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <Image
            src="https://cdn.pixabay.com/photo/2018/09/18/09/30/golf-3685616__480.jpg"
            alt="상품 이미지"
            title="상품 이미지"
            layout="fill"
            objectFit="cover" />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <Image
            src="https://cdn.pixabay.com/photo/2020/04/29/02/12/golf-5106917__480.jpg"
            alt="상품 이미지"
            title="상품 이미지"
            layout="fill"
            objectFit="cover" />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <Image
            src="https://cdn.pixabay.com/photo/2020/04/29/02/12/golf-5106918__480.jpg"
            alt="상품 이미지"
            title="상품 이미지"
            layout="fill"
            objectFit="cover" />
        </div>
      </SwiperCustom>

      <Article __style={{ 
          // borderBottom: '1px solid #e9ebee' 
        }}>
        <List __defaultItemMarginBottom="5px" __direction="vertical" __width="100%">
          <ListItem>
            <span style={{ fontSize: '0.8rem', color: '#646f7c' }}>맥켄리</span>
          </ListItem>
          <ListItem>
            <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', letterSpacing: '-0.05rem' }}>페르마 플러스 드라이버 헤드 (9.5도 단품)</span>
          </ListItem>
          <ListItem>
            <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>★ &nbsp;</span> 
            <span style={{ color: '#646f7c', fontSize: '0.7rem', display: 'inline-flex' }}>4.7 (3)</span>
          </ListItem>
          <ListItem>
            <span style={{ color: '#13162b', fontSize: '1.3rem', display: 'inline-flex', fontWeight: 'bold' }}>210,000원</span> 
          </ListItem>
          <ListItem>
            <BothSidebox
              __leftComponentStyle={{ width: 'calc(100% - 30px)' }}
              __leftComponent={<>
                <HashTagItem>새상품</HashTagItem>
                <HashTagItem>아시안 스펙</HashTagItem>
                <HashTagItem>병행 수입</HashTagItem>
                <HashTagItem>무료배송</HashTagItem>
              </>}
              __rightComponentStyle={{ width: '30px' }}
              __rightComponent={<>
                <div style={{ display: 'inline-flex', cursor: 'pointer' }} onClick={shareButtonClick}>
                  <SvgShareIcon />
                </div>
              </>} />
          </ListItem>
        </List>
      </Article>
      <StrokeTabButtonBox
        __valueItems={[
          { text: '상품 정보', value: 'product-info' },
          { text: '상품 설명', value: 'product-description' },
          { text: '상품 문의', value: 'product-question' },
        ]}
        __activeValue="product-info"
        __onTabClick={onTabClick} />
      <Article>
        <div className={styles['article-title-row']}>
          상품 정보
        </div>
        <List __width="100%" __direction="vertical" __defaultItemMarginBottom="6px">
          <ListItem>
            <TitleAndContentRowItem
              __title={<>상품명</>}
              __content={<>페르마 플러스 드라이버 헤드 BM1052</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>브랜드</>}
              __content={<>브랜드</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>제조사/원산지</>}
              __content={<>Nike/미국</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>정품여부</>}
              __content={<>병행수입</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>성별</>}
              __content={<>남성용</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>로프드각</>}
              __content={<>10.5도</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>샤프트</>}
              __content={<>기본 샤프트</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>AS 가능여부</>}
              __content={<>가능</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>상태</>}
              __content={<>새상품</>} />
          </ListItem>
          <ListItem>
            <TitleAndContentRowItem
              __title={<>라인</>}
              __content={<>입문 초급</>} />
          </ListItem>
        </List>
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={getClasses([styles['article-title-row'], styles['not-margin-bottom']])}>
          상품 설명
        </div>
      </Article>
      <ProductDetailImageBox />
    </>
  );
};

export default NewProductFormBox;
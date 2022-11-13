import styles from "./product-row-item2.component.module.scss";
import { IProductRowItem2 } from "./product-row-item2.interface";
import Image from 'next/image';
import List, { ListItem } from "../../layouts/list/list.component";
import TextProductBrandName from "../../texts/text-product-brand-name/text-product-brand-name.component";
import TextProductName from "../../texts/text-product-name/text-product-name.component";
import TextProductPrice from "../../texts/text-product-price/text-product-price.component";
import HashTagItem from "../../boxes/hash-tag-item/hash-tag-item.component";

const ProductRowItem2 = (props: IProductRowItem2.Props) => {
  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <div className={styles['photo-area']}>
          <Image
            src="https://cdn.pixabay.com/photo/2016/04/12/14/31/backpack-1324445__480.jpg"
            alt="상품 이미지"
            title="상품 이미지"
            layout="fill"
            objectFit="cover" />
        </div>
        <div className={styles['product-info-area']}>
          <List __defaultItemMarginBottom="4px" __direction="vertical" __width="100%">
            <ListItem>
              <TextProductBrandName>맥켄리</TextProductBrandName>
            </ListItem>
            <ListItem>
              <TextProductName>페르마 플러스 드라이버 헤드 (9.5도 단품)</TextProductName>
            </ListItem>
            <ListItem>
              <TextProductPrice>560,000원</TextProductPrice>
            </ListItem>
            <ListItem>
              <HashTagItem>중고</HashTagItem>
              <HashTagItem>상태상</HashTagItem>
              <HashTagItem>무료배송</HashTagItem>
              <HashTagItem>아시안스펙</HashTagItem>
              <HashTagItem>병행수입</HashTagItem>
            </ListItem>
          </List>
        </div>
      </div>
    </>
  );
};

export default ProductRowItem2;
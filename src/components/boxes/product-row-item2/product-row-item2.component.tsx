import styles from "./product-row-item2.component.module.scss";
import { IProductRowItem2 } from "./product-row-item2.interface";
import Image from 'next/image';
import List, { ListItem } from "../../layouts/list/list.component";
import TextProductBrandName from "../../texts/text-product-brand-name/text-product-brand-name.component";
import TextProductName from "../../texts/text-product-name/text-product-name.component";
import TextProductPrice from "../../texts/text-product-price/text-product-price.component";
import HashTagItem from "../../boxes/hash-tag-item/hash-tag-item.component";
import { useCallback, useEffect, useState } from "react";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";

const ProductRowItem2 = (props: IProductRowItem2.Props) => {
  const imageManager = useImageManager();

  const [imageUrl, setImageUrl] = useState(props.__imageUrl);
  useEffect(() => { setImageUrl(props.__imageUrl); }, [props.__imageUrl]);

  const [brandName, setBrandName] = useState(props.__brandName);
  useEffect(() => { setBrandName(props.__brandName); }, [props.__brandName]);

  const [productName, setProductName] = useState(props.__productName);
  useEffect(() => { setProductName(props.__productName); }, [props.__productName]);

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price); }, [props.__price]);

  const [tags, setTags] = useState(props.__tags);
  useEffect(() => { setTags(props.__tags); }, [props.__tags]);

  const itemClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <div className={styles['container']} style={props.__style} onClick={itemClick}>
        <div className={styles['photo-area']}>
          {
            typeof imageUrl === 'string' ? 
            <Image
              src={imageManager.getImageUrl(imageUrl, '?s=120x120&t=crop&q=60&f=webp')}
              alt="상품 이미지"
              title="상품 이미지"
              fill={true}
              sizes="100%"
              priority={true}
              style={{
                objectFit: 'cover',
              }} />
            : undefined
          }
        </div>
        <div className={styles['product-info-area']}>
          <List __defaultItemMarginBottom="4px" __direction="vertical" __width="100%">
            <ListItem>
              <TextProductBrandName>{ brandName }</TextProductBrandName>
            </ListItem>
            <ListItem>
              <TextProductName>{ productName }</TextProductName>
            </ListItem>
            <ListItem>
              <TextProductPrice>{ getAddCommaNumberString({ numberValue: price }) }원</TextProductPrice>
            </ListItem>
            <ListItem>
              {
                tags?.map((item, index) => {
                  return <HashTagItem key={index}>{ item }</HashTagItem>
                })
              }
            </ListItem>
          </List>
        </div>
      </div>
    </>
  );
};

export default ProductRowItem2;
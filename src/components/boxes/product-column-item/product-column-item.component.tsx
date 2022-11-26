import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import HashTagItem from "../hash-tag-item/hash-tag-item.component";
import styles from "./product-column-item.component.module.scss";
import { IProductColumnItem } from "./product-column-item.interface";

const ProductColumnItem = (props: IProductColumnItem.Props) => {
  const [imageUrl, setImageUrl] = useState(props.__imageUrl);
  useEffect(() => { setImageUrl(props.__imageUrl) }, [props.__imageUrl]);

  const [brandNameComponent, setBrandNameComponent] = useState(props.__brandNameComponent);
  useEffect(() => { setBrandNameComponent(props.__brandNameComponent) }, [props.__brandNameComponent]);

  const [productNameComponent, setProductNameComponent] = useState(props.__productNameComponent);
  useEffect(() => { setProductNameComponent(props.__productNameComponent) }, [props.__productNameComponent]);

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price) }, [props.__price]);

  const [tags, setTags] = useState(props.__tags);
  useEffect(() => { setTags(props.__tags) }, [props.__tags]);

  const itemClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <div className={styles['container']} style={props.__style} onClick={itemClick}>
        <div className={styles['image-row']}>
          <Image
            src={imageUrl ?? 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__480.jpg'}
            alt="로고 이미지" title="로고 이미지" layout="fill" objectFit="contain" />
        </div>
        <div className="w-full flex flex-wrap mb-1">
          <span className="inline-flex flex-wrap font-bold text-sm text-gray-b">{brandNameComponent}</span>
        </div>
        <div className="w-full flex flex-wrap mb-1">
          <span className="inline-flex flex-wrap font-normal text-sm text-black-a">{productNameComponent}</span>
        </div>
        {
          tags !== undefined ? 
          <div className="w-full flex flex-wrap mb-2">
            {
              tags?.map((item, index) => {
                return (
                  <HashTagItem key={index}>{ item }</HashTagItem>
                );
              })
            }
          </div> : <></>
        }
        <div className="w-full flex flex-wrap">
          <span className="inline-flex flex-wrap font-bold text-sm text-black-a">{ getAddCommaNumberString({ numberValue: price }) }원</span>
        </div>
      </div>
    </>
  );
};

export default ProductColumnItem;
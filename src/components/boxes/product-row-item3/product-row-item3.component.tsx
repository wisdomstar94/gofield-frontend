import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgCategoryEtcIcon from "../../svgs/svg-category-etc-icon/svg-category-etc-icon.component";
import styles from "./product-row-item3.component.module.scss";
import { IProductRowItem3 } from "./product-row-item3.interface";

const ProductRowItem3 = (props: IProductRowItem3.Props) => {
  const router = useRouter();

  const [imageUrl, setimageUrl] = useState(props.__imageUrl);
  useEffect(() => { setimageUrl(props.__imageUrl); }, [props.__imageUrl]);

  const [productName, setProductName] = useState(props.__productName);
  useEffect(() => { setProductName(props.__productName); }, [props.__productName]);

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price); }, [props.__price]);

  const [deliveryPrice, setDeliveryPrice] = useState(props.__deliveryPrice);
  useEffect(() => { setDeliveryPrice(props.__deliveryPrice); }, [props.__deliveryPrice]);

  const [optionNames, setoptionNames] = useState(props.__optionNames);
  useEffect(() => { setoptionNames(props.__optionNames); }, [props.__optionNames]);

  const [qty, setQty] = useState(props.__qty);
  useEffect(() => { setQty(props.__qty); }, [props.__qty]);


  const [buttonLayoutType, setButtonLayoutType] = useState<IProductRowItem3.ButtonLayoutType>(props.__buttonLayoutType ?? 'exchange-refund-review');
  useEffect(() => { setButtonLayoutType(props.__buttonLayoutType ?? 'exchange-refund-review') }, [props.__buttonLayoutType]);

  const [isTopRowShow, setIsTopRowShow] = useState(props.__isTopRowShow);
  useEffect(() => { setIsTopRowShow(props.__isTopRowShow) }, [props.__isTopRowShow]);

  const reviewWriteButtonClick = useCallback(() => {
    router.push('/review/write/e35asb-1193506-1344/A0001');
  }, [router]);

  return (
    <>
      <div className={styles['container']}>
        {
          isTopRowShow !== false ?
          <BothSidebox
            __style={{ marginBottom: '8px' }}
            __leftComponentStyle={{ width: 'calc(100% - 30px)' }}
            __leftComponent={<>
              <div className="text-sm font-bold text-blue-a">배송완료</div>
              &nbsp;&nbsp;
              <div className="text-sm text-black-a font-normal">2022.6.3(월) 도착</div>
            </>}
            __rightComponentStyle={{ width: '30px' }}
            __rightComponent={<>
              <div className={styles['more-button-icon']}>
                <SvgCategoryEtcIcon />
              </div>
            </>} /> :
            ''
        }

        <BothSidebox
          __style={{ alignItems: 'flex-start', alignContent: 'flex-start', marginBottom: '8px' }}
          __leftComponentStyle={{ width: '88px' }}
          __leftComponent={<>
            <div className={styles['product-image-box']}>
              <div className="next-image-wrapper">
                {
                  typeof imageUrl === 'string' ? 
                  <Image
                    src={imageUrl}
                    alt="상품 썸네일 이미지"
                    title="상품 썸네일 이미지"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top" /> : 
                  <></>
                }
              </div>
            </div>
          </>}
          __rightComponentStyle={{ width: 'calc(100% - 88px)' }}
          __rightComponent={<>
            <List __width="100%" __direction="vertical" __defaultItemMarginBottom="4px">
              <ListItem>
                <div className="text-sm text-black-a font-normal tracking-tighter break-keep">{ productName }</div>
              </ListItem>
              <ListItem>
                <div className="text-sm text-black-a font-bold tracking-tight">{ getAddCommaNumberString({ numberValue: price }) }원</div>
              </ListItem>
              {
                Array.isArray(optionNames) && optionNames.length > 0 ? 
                <ListItem>
                  <div className="text-xs text-black-a tracking-tight">옵션 : { optionNames?.join(', ') }</div>
                </ListItem>
                : undefined
              }
              <ListItem __marginBottom="0">
                <div className="text-xs text-black-a tracking-tight">수량 : { qty }</div>
              </ListItem>
              <ListItem __marginBottom="0">
                <div className="text-xs text-black-a tracking-tight">배송료 : { getAddCommaNumberString({ numberValue: deliveryPrice }) }원</div>
              </ListItem>
            </List>
          </>} />
        
          {
            buttonLayoutType === 'exchange-refund-review' ?
            <>
              <div className="w-full box-border grid grid-cols-2 gap-2 my-2">
                <div>
                  <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
                    <span className="text-sm font-bold">교환 반품 신청</span>
                  </Button>
                </div>
                <div>
                  <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
                    <span className="text-sm font-bold">배송 조회</span>
                  </Button>
                </div>
              </div>

              <div className="w-full box-border">
                <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }} __onClick={reviewWriteButtonClick}>
                  <span className="text-sm font-bold">상품 리뷰 쓰기</span>
                </Button>
              </div>
            </>
            : <></>
          }

          {
            buttonLayoutType === 'order-delicery-cancel' ?
            <>
              <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }}>
                <span className="text-sm font-bold">주문 배송 취소</span>
              </Button>
            </>
            : <></>
          }
      </div>
      <div className="block mx-4 h-px bg-gray-a"></div>
    </>
  );
};

export default ProductRowItem3;
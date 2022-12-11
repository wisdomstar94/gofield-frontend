import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useCodeOrderItemStatusListQuery from "../../../hooks/use-queries/use-code-order-item-status-list.query";
import useCodeOrderShippingStatusListQuery from "../../../hooks/use-queries/use-code-order-shipping-status-list.query";
import { day } from "../../../librarys/date-util/date-util.library";
import { getAddCommaNumberString, getClasses } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgCategoryEtcIcon from "../../svgs/svg-category-etc-icon/svg-category-etc-icon.component";
import styles from "./product-row-item3.component.module.scss";
import { IProductRowItem3 } from "./product-row-item3.interface";

const ProductRowItem3 = (props: IProductRowItem3.Props) => {
  const router = useRouter();
  const codeOrderShippingStatusListQuery = useCodeOrderShippingStatusListQuery();
  const codeOrderItemStatusListQuery = useCodeOrderItemStatusListQuery();

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

  const [estimatedArriveDate, setEstimatedArriveDate] = useState(props.__estimatedArriveDate);
  useEffect(() => { setEstimatedArriveDate(props.__estimatedArriveDate); }, [props.__estimatedArriveDate]);

  const [orderShippingStatus, setOrderShippingStatus] = useState(props.__orderShippingStatus);
  useEffect(() => { setOrderShippingStatus(props.__orderShippingStatus); }, [props.__orderShippingStatus]);

  const [orderItemStatus, setOrderItemStatus] = useState(props.__orderItemStatus);
  useEffect(() => { setOrderItemStatus(props.__orderItemStatus); }, [props.__orderItemStatus]);

  const [showButtonTypes, setShowButtonTypes] = useState(props.__showButtonTypes);
  useEffect(() => { setShowButtonTypes(props.__showButtonTypes); }, [props.__showButtonTypes]);

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
              <div className="text-sm font-bold text-blue-a mr-4">{ codeOrderShippingStatusListQuery.data?.find(x => x.value === orderShippingStatus)?.text }</div>
              <div className="text-sm font-bold text-orange-a mr-4">{ codeOrderItemStatusListQuery.data?.find(x => x.value === orderItemStatus)?.text }</div>
              &nbsp;&nbsp;
              {
                typeof estimatedArriveDate === 'string' ? 
                <div className="text-sm text-black-a font-normal">{ day(new Date(estimatedArriveDate)).format('YYYY-MM-DD') } 도착</div> : 
                <></>
              }
            </>}
            __rightComponentStyle={{ width: '30px' }}
            __rightComponent={<>
              <div className={styles['more-button-icon']}>
                {/* <SvgCategoryEtcIcon /> */}
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
              {
                deliveryPrice !== undefined ? 
                <ListItem __marginBottom="0">
                  <div className="text-xs text-black-a tracking-tight">배송료 : { getAddCommaNumberString({ numberValue: deliveryPrice }) }원</div>
                </ListItem> : 
                undefined
              }
            </List>
          </>} />
        
        {
          showButtonTypes !== undefined && showButtonTypes?.length > 0 ? 
          <div data-name="bottom-button-list-row" className="w-full grid grid-cols-2 gap-2 relative">
            {
              showButtonTypes.map((item, index) => {
                return (
                  <div key={index}
                    className={getClasses([
                      item.buttonWidthType === 'full' ? 'col-span-2' : '',
                      item.buttonWidthType === 'half' ? '' : '',
                    ])}>
                    {
                      item.buttonType === 'exchange-refund' ? 
                      <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
                        <span className="text-sm font-bold">교환 반품 신청</span>
                      </Button> : undefined
                    }
                    {
                      item.buttonType === 'delivery-check' ? 
                      <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
                        <span className="text-sm font-bold">배송 조회</span>
                      </Button> : undefined
                    }
                    {
                      item.buttonType === 'review-write' ? 
                      <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }} __onClick={reviewWriteButtonClick}>
                        <span className="text-sm font-bold">상품 리뷰 쓰기</span>
                      </Button> : undefined
                    }
                  </div>    
                )
              })
            }
          </div> : undefined
        }
      </div>
      <div className="block mx-4 h-px bg-gray-a"></div>
    </>
  );
};

export default ProductRowItem3;
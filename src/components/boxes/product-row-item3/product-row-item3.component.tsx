import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useOrderCarrierTrack from "../../../hooks/use-apis/use-order-carrier-track.api";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useModalConfirm from "../../../hooks/use-modals/use-modal-confirm.modal";
import useCodeOrderItemStatusListQuery from "../../../hooks/use-queries/use-code-order-item-status-list.query";
import useEnumOrderShippingStatusListQuery from "../../../hooks/use-queries/use-enum-order-shipping-status-list.query";
import { day } from "../../../librarys/date-util/date-util.library";
import { getAddCommaNumberString, getClasses } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgCategoryEtcIcon from "../../svgs/svg-category-etc-icon/svg-category-etc-icon.component";
import ImageBox from "../image-box/image-box.component";
import styles from "./product-row-item3.component.module.scss";
import { IProductRowItem3 } from "./product-row-item3.interface";

const ProductRowItem3 = (props: IProductRowItem3.Props) => {
  const imageManager = useImageManager();
  const router = useRouter();
  const enumOrderShippingStatusListQuery = useEnumOrderShippingStatusListQuery();
  const codeOrderItemStatusListQuery = useCodeOrderItemStatusListQuery();
  const orderCarrierTrack = useOrderCarrierTrack();
  const modalAlert = useModalAlert();
  const modalConfirm = useModalConfirm();

  const [orderItemNumber, setOrderItemNumber] = useState(props.__orderItemNumber);
  useEffect(() => { setOrderItemNumber(props.__orderItemNumber) }, [props.__orderItemNumber]);

  const [orderNumber, setOrderNumber] = useState(props.__orderNumber);
  useEffect(() => { setOrderNumber(props.__orderNumber); }, [props.__orderNumber]);

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

  const [orderItemId, setOrderItemId] = useState(props.__orderItemId);
  useEffect(() => { setOrderItemId(props.__orderItemId) }, [props.__orderItemId]);

  const [shippingNumber, setShippingNumber] = useState(props.__shippingNumber);
  useEffect(() => { setShippingNumber(props.__shippingNumber) }, [props.__shippingNumber]);

  // const [carrierId, setCarrierId] = useState(props.__carrierId);
  // useEffect(() => { setCarrierId(props.__carrierId); }, [props.__carrierId]);

  // const [trackId, setTrackId] = useState(props.__trackId);
  // useEffect(() => { setTrackId(props.__trackId); }, [props.__trackId]);

  const [purchaseConfirmationDate, setPurchaseConfirmationDate] = useState(props.__purchaseConfirmationDate);
  useEffect(() => { setPurchaseConfirmationDate(props.__purchaseConfirmationDate); }, [props.__purchaseConfirmationDate]);



  const reviewWriteButtonClick = useCallback(() => {
    if (orderNumber === undefined) {
      console.error('orderNumber 가 없습니다.');
      return;
    }

    if (orderItemId === undefined) {
      console.error('orderItemId 가 없습니다.');
      return;
    }

    router.push('/review/write/' + orderNumber + '/' + orderItemId);
  }, [orderItemId, orderNumber, router]);

  const orderDeliveryCancelButtonClick = useCallback(() => {
    modalConfirm.show({
      title: '안내',
      content: '해당 상품의 주문/배송 취소 신청을 진행하시겠습니까?',
      positiveCallback: (hide, modalItem) => {
        router.push(`/order-cancel/${orderItemId}/reason/`);
        hide(modalItem);
      },
    })
  }, [modalConfirm, orderItemId, router]);

  const exchangeReturnApplyButtonClick = useCallback(() => {
    router.push(`/exchange-return/${orderItemId}/reason`);
  }, [orderItemId, router]);

  const deliveryStatusViewButtonClick = useCallback(() => {
    // if (carrierId === undefined || carrierId === null) {
    //   console.error('carrierId 가 없습니다.');
    //   modalAlert.show({ title: '안내', content: '배송 정보가 없습니다.' });
    //   return;
    // }

    // if (trackId === undefined || trackId === null) {
    //   console.error('trackId 가 없습니다.');
    //   return;
    // }
    if (typeof shippingNumber !== 'string') {
      console.error('shippingNumber 가 없습니다.');
      modalAlert.show({ title: '안내', content: '배송 정보가 없습니다.' });
      return;
    }

    orderCarrierTrack.getInstance(shippingNumber).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '배송 정보를 가져오는데 실패하였습니다.' });
        return;
      }

      window.open(response.data.data.nextUrl, '_blank');
    }).finally(() => {
      
    });
  }, [modalAlert, orderCarrierTrack, shippingNumber]);

  return (
    <>
      <div className={styles['container']}>
        {
          isTopRowShow !== false ?
          <BothSidebox
            __style={{ marginBottom: '8px' }}
            __leftComponentStyle={{ width: 'calc(100% - 30px)' }}
            __leftComponent={<>
              <div className="text-sm font-bold text-blue-a mr-4">{ enumOrderShippingStatusListQuery.data?.find(x => x.value === orderShippingStatus)?.text }</div>
              {/* <div className="text-sm font-bold text-orange-a mr-4">{ codeOrderItemStatusListQuery.data?.find(x => x.value === orderItemStatus)?.text }</div> */}
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
                  <ImageBox
                    mode="pure"
                    src={imageManager.getImageUrl(imageUrl, '?s=120x120&t=crop&q=100&f=webp')}
                    alt="상품 썸네일 이미지"
                    title="상품 썸네일 이미지"
                    fill={true}
                    sizes="100%"
                    placeholder="blur"
                    blurDataURL="/images/loading-files.gif"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }} /> : 
                  <></>
                }
              </div>
            </div>
          </>}
          __rightComponentStyle={{ width: 'calc(100% - 88px)' }}
          __rightComponent={<>
            <List __width="100%" __direction="vertical" __defaultItemMarginBottom="4px">
              {
                orderItemNumber !== undefined ? 
                <ListItem>
                  <span className={styles['small-gray']}>주문상품번호 : { orderItemNumber }</span>
                </ListItem>
                : null
              }
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
                typeof purchaseConfirmationDate === 'string' ? 
                <ListItem __marginBottom="0">
                  <div className="text-xs text-gray-b tracking-tight">구매확정일자 : { day(new Date(purchaseConfirmationDate)).format('YYYY-MM-DD') }</div>
                </ListItem> : 
                undefined
              }
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
          <div data-name="bottom-button-list-row" className={styles['bottom-button-list-box']}>
            {
              showButtonTypes.map((item, index) => {
                return (
                  <div key={index}
                    className={getClasses([
                      styles['grid-item'],
                      item.buttonWidthType === 'full' ? styles['full'] : '',
                      // item.buttonWidthType === 'full' ? 'col-span-2' : '',
                      // item.buttonWidthType === 'half' ? '' : '',
                    ])}>
                    {
                      item.buttonType === 'exchange-refund' ? 
                      <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }} __onClick={exchangeReturnApplyButtonClick}>
                        <span className="text-sm font-bold">교환 반품 신청</span>
                      </Button> : undefined
                    }
                    {
                      item.buttonType === 'delivery-check' ? 
                      <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }} __onClick={deliveryStatusViewButtonClick}>
                        <span className="text-sm font-bold">배송 조회</span>
                      </Button> : undefined
                    }
                    {
                      item.buttonType === 'review-write' ? 
                      <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }} __onClick={reviewWriteButtonClick}>
                        <span className="text-sm font-bold">상품 리뷰 쓰기</span>
                      </Button> : undefined
                    }
                    {
                      item.buttonType === 'order-delivery-cancel' ? 
                      <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }} __onClick={orderDeliveryCancelButtonClick}>
                        <span className="text-sm font-bold">주문/배송 취소</span>
                      </Button> : undefined
                    }
                  </div>    
                )
              })
            }
          </div> : undefined
        }
      </div>
      <div className={styles['division-line']}></div>
    </>
  );
};

export default ProductRowItem3;
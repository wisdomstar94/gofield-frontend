import { useRouter } from "next/router";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import Config from "../../../configs/config.export";
import useOrderPaymentApi from "../../../hooks/use-apis/use-order-payment.api";
import useOrderSheetInfoApi from "../../../hooks/use-apis/use-order-sheet-info.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useCodePaymentCardListQuery from "../../../hooks/use-queries/use-code-payment-card-list.query";
import useCodePaymentEasypayListQuery from "../../../hooks/use-queries/use-code-payment-easypay-list.query";
import useCodePaymentMethodListQuery from "../../../hooks/use-queries/use-code-payment-method-list.query";
import useCodeShippingCommentListQuery from "../../../hooks/use-queries/use-code-shipping-comment-list.query";
import { IAddress } from "../../../interfaces/address/address.interface";
import { IDaum } from "../../../interfaces/daum/daum.interface";
import { IOrder } from "../../../interfaces/order/order.interface";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import Button from "../../forms/button/button.component";
import Checkbox from "../../forms/checkbox/checkbox.component";
import { ICheckbox } from "../../forms/checkbox/checkbox.interface";
import Input from "../../forms/input/input.component";
import SelectBox from "../../forms/select-box/select-box.component";
import Article from "../../layouts/article/article.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../layouts/list/list.component";
import ModalAddressBook from "../../modals/modal-address-book/modal-address-book.component";
import { IModalAddressBook } from "../../modals/modal-address-book/modal-address-book.interface";
import FormListBox from "../form-list-box/form-list-box.component";
import ProductRowItem2 from "../product-row-item2/product-row-item2.component";
import ProductRowItem3 from "../product-row-item3/product-row-item3.component";
import styles from "./order-form-box.component.module.scss";
import { IOrderFormBox } from "./order-form-box.interface";

const OrderFormBox = (props: IOrderFormBox.Props) => {
  const router = useRouter();
  const modalAlert = useModalAlert();
  const orderPaymentApi = useOrderPaymentApi();
  const orderSheetInfoApi = useOrderSheetInfoApi();
  const modalAddressBookRef = useRef<IModalAddressBook.RefObject>(null);
  const [_, setTimestamp] = useState(0);
  // const detailInfoRef = useRef<IOrderFormBox.DetailInfo>(props.__detailInfo ?? {});
  const [detailInfo, setDetailInfo] = useState<IOrder.OrderFormDetailInfo>(props.__detailInfo ?? {
    environment: Config().mode === 'local' ? 'LOCAL' : 'PROD',
  });
  useEffect(() => {
    setDetailInfo(props.__detailInfo ?? {
      environment: Config().mode === 'local' ? 'LOCAL' : 'PROD',
    });
  }, [props.__detailInfo]);

  const [orderSheetInfo, setOrderSheetInfo] = useState<IOrder.OrderSheetInfo>();

  const codeShippingCommentListQuery = useCodeShippingCommentListQuery();
  const codePaymentMethodListQuery = useCodePaymentMethodListQuery();
  const codePaymentCardListQuery = useCodePaymentCardListQuery();
  const codePaymentEasypayListQuery = useCodePaymentEasypayListQuery();

  const isPaymentingRef = useRef(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const orderCode = router.query._orderCode;
    if (typeof orderCode !== 'string') {
      return;
    }

    orderSheetInfoApi.getInstance(orderCode).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      setOrderSheetInfo(response.data.data);
      if (response.data.data.shippingAddress !== null) {
        setDetailInfo(prev => ({
          ...prev,
          uuid: orderCode,
          shippingAddress: {
            ...prev.shippingAddress,
            ...response.data.data.shippingAddress,
          },
        }));
      }
    }).finally(() => {

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const getterNameChange = useCallback((value: string) => {
    // detailInfoRef.current.getterName = value;
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        name: value,
      },
    }));
  }, []);

  const cpChange = useCallback((value: string) => {
    // detailInfoRef.current.cp = value;
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        tel: value,
      },
    }));
  }, []);

  const postNumberChange = useCallback((value: string) => {
    // detailInfoRef.current.postNumber = value;
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        zipCode: value,
      },
    }));
  }, []);

  const addrDetailChange = useCallback((value: string) =>{
    // detailInfoRef.current.addrDetail = value;
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        addressExtra: value,
      },
    }));
  }, []);

  const requestMessageChange = useCallback((value: string) => {
    // detailInfoRef.current.requestMessage = value;
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        shippingComment: value,
      },
    }));
  }, []);

  const payMethodChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    setDetailInfo(prev => ({
      ...prev,
      paymentType: changeInfo.value as IOrder.PaymentType,
      companyCode: undefined,
    }));
  }, []);

  const postNumberSearchButtonClick = useCallback(() => {
    new (window as any).daum.Postcode({
      oncomplete: function(data: IDaum.AddrInfo) {
        // console.log('data', data);
        // console.log('data', JSON.stringify(data, undefined, 2));

        // detailInfoRef.current.addrBasic = data.address;
        // detailInfoRef.current.postNumber = data.zonecode;
        setDetailInfo(prev => ({
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            address: data.address,
            zipCode: data.zonecode,
          },
        }));
        // setTimestamp(new Date().getTime());
      },
    }).open();
  }, []);

  const addressBookButtonClick = useCallback(() => {
    modalAddressBookRef.current?.show();
  }, []);

  const onAddressSelected = useCallback((item: IAddress.AddressItem) => {
    setDetailInfo(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        name: item.name,
        tel: item.tel,
        address: item.address,
        addressExtra: item.addressExtra,
        zipCode: item.zipCode,
      },
    }))
  }, []);

  const companyCodeChange = useCallback((value: string) => {
    setDetailInfo(prev => ({
      ...prev,
      companyCode: value,
    }));
  }, []);

  const getTotalPriceInfo = useCallback(() => {
    const totalPrice = orderSheetInfo?.orderSheet.totalPrice ?? 0;
    const totalDelivery = orderSheetInfo?.orderSheet.totalDelivery ?? 0;
    const total = totalPrice + totalDelivery;
    return {
      totalPrice, totalDelivery, total,
    };
  }, [orderSheetInfo?.orderSheet.totalDelivery, orderSheetInfo?.orderSheet.totalPrice]);

  const submitButtonClick = useCallback(() => {
    console.log('detailInfo', detailInfo);

    if (typeof detailInfo.shippingAddress?.name !== 'string' || detailInfo.shippingAddress?.name.trim() === '') {
      modalAlert.show({ title: '안내', content: '수령인 이름을 입력해주세오.' });
      return;
    }

    if (typeof detailInfo.shippingAddress?.tel !== 'string' || detailInfo.shippingAddress?.tel.trim() === '') {
      modalAlert.show({ title: '안내', content: '수령인 휴대폰번호를 입력해주세오.' });
      return;
    }

    if (typeof detailInfo.shippingAddress?.zipCode !== 'string' || detailInfo.shippingAddress?.zipCode.trim() === '') {
      modalAlert.show({ title: '안내', content: '수령인 우편번호를 입력해주세요.' });
      return;
    }

    if (typeof detailInfo.shippingAddress?.addressExtra !== 'string' || detailInfo.shippingAddress?.addressExtra.trim() === '') {
      modalAlert.show({ title: '안내', content: '수령인 주소를 입력해주세요.' });
      return;
    }

    if (typeof detailInfo.paymentType !== 'string' || detailInfo.paymentType.trim() === '') {
      modalAlert.show({ title: '안내', content: '결제 정보(결제 수단)를 입력해주세요.' });
      return;
    }

    if (detailInfo.paymentType === 'CARD') {
      if (typeof detailInfo.companyCode !== 'string' || detailInfo.companyCode.trim() === '') {
        modalAlert.show({ title: '안내', content: '결제 정보(결제 은행사)를 입력해주세요.' });
        return;
      }
    }

    if (detailInfo.paymentType === 'EASYPAY') {
      if (typeof detailInfo.companyCode !== 'string' || detailInfo.companyCode.trim() === '') {
        modalAlert.show({ title: '안내', content: '결제 정보(간편 결제 종류)를 입력해주세요.' });
        return;
      }
    }

    if (isPaymentingRef.current) {
      return;
    }

    isPaymentingRef.current = true;
    orderPaymentApi.getInstance(detailInfo).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '결제 요청에 실패하였습니다.' });
        return;
      }

      location.href = response.data.data.nextUrl;
    }).finally(() => {
      isPaymentingRef.current = false;
    });
  }, [detailInfo, modalAlert, orderPaymentApi]);

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" defer={true}></Script>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>배송정보</>}
            __rightComponent={<>
              <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '10px 16px' }} __onClick={addressBookButtonClick}>
                주소록
              </Button>
            </>} />
        </div>
        <FormListBox
          __formItems={[
            {
              titleComponent: <>수령인</>,
              contentComponent: <><Input __type="text" __placeholder="이름을 입력해 주세요" __value={detailInfo.shippingAddress?.name ?? ''} __onChange={getterNameChange} /></>,
            },
            {
              titleComponent: <>휴대폰번호</>,
              contentComponent: <><Input __type="number" __placeholder="01000000000" __value={detailInfo.shippingAddress?.tel ?? ''} __onChange={cpChange} /></>,
            },
            {
              titleComponent: <>우편번호</>,
              contentComponent: <>
                <BothSidebox
                  __leftComponentStyle={{ width: 'calc(100% - 132px)' }}
                  __leftComponent={<><Input __type="number" __disable={true} __placeholder="00000" __value={detailInfo.shippingAddress?.zipCode ?? ''} __onChange={postNumberChange} /></>}
                  __rightComponentStyle={{ width: '132px' }}
                  __rightComponent={<>
                    <Button __style={{ width: 'calc(100% - 8px)', padding: '12px 14px' }} __buttonStyle="black-solid-radius" __onClick={postNumberSearchButtonClick}>
                      우편번호 검색
                    </Button>
                  </>}/>
              </>,
            },
            {
              titleComponent: <>주소</>,
              contentComponent: <>
                <Input __type="text" __disable={true} __placeholder="기본 주소" __value={detailInfo.shippingAddress?.address ?? ''} __onChange={() => {  }} />
                <EmptyRow __style={{ height: '10px' }} />
                <Input __type="text" __placeholder="나머지 주소를 입력해주세요" __value={detailInfo.shippingAddress?.addressExtra ?? ''} __onChange={addrDetailChange} />
                <EmptyRow __style={{ height: '10px' }} />
                <SelectBox 
                  __valueItems={codeShippingCommentListQuery.data} 
                  __placeholder="배송 요청 사항을 선택해주세요."
                  __onChange={(value) => {
                    setDetailInfo(prev => ({
                      ...prev,
                      shippingAddress: {
                        ...prev.shippingAddress,
                        shippingCode: value,
                      },
                    }))
                  }} />
                <EmptyRow __style={{ height: '10px' }} />
                {
                  detailInfo.shippingAddress?.shippingCode === '00028' ? 
                  <Input
                    __type="text" 
                    __placeholder="배송시 요청사항을 입력해주세요." 
                    __value={detailInfo.shippingAddress?.shippingComment ?? ''} 
                    __onChange={requestMessageChange} /> :
                  <></>
                }
              </>,
            },
          ]} />
      </Article>
      <div className={styles['deco-line']}></div>

      <Article __style={{ paddingBottom: '0' }}>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>주문상품 정보</>}
            __rightComponent={<></>} />
        </div>
      </Article>

      <div data-name="product-list-area" className="w-full block">
        {
          orderSheetInfo?.orderSheet.orderSheetList.map((item, index) => {
            return (
              <ProductRowItem3
                key={index}  
                __imageUrl={item.thumbnail}
                __qty={item.qty}
                __price={item.price * item.qty}
                __optionNames={item.optionName}
                __productName={item.name}
                __buttonLayoutType="none"
                __deliveryPrice={item.deliveryPrice}
                __isTopRowShow={false} />
            )
          })
        }
      </div>

      <div className={styles['deco-line']}></div>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>결제 정보</>}
            __rightComponent={<></>} />
        </div>
        <List __width="100%" __direction="vertical" __defaultItemMarginBottom="14px">
          {
            codePaymentMethodListQuery.data?.map((item, index) => {
              return (
                <ListItem key={index}>
                  <Checkbox 
                    __name="pay-method" 
                    __value={item.value} 
                    __checkState={detailInfo.paymentType === item.value ? 'checked' : 'none-checked'} 
                    __onChange={payMethodChange}>{ item.text }</Checkbox>
                </ListItem>      
              );
            })
          }
        </List>
        <div className="w-full relative">
          {
            detailInfo.paymentType === 'CARD' ? 
            <SelectBox
              __valueItems={codePaymentCardListQuery.data}
              __placeholder="결제 은행사를 선택해주세요."
              __value={detailInfo.companyCode}
              __onChange={companyCodeChange} /> : undefined
          }
          {
            detailInfo.paymentType === 'EASYPAY' ? 
            <SelectBox
              __valueItems={codePaymentEasypayListQuery.data}
              __placeholder="간편 결제 종류를 선택해주세요."
              __value={detailInfo.companyCode}
              __onChange={companyCodeChange} /> : undefined
          }
        </div>
      </Article>
      <div className={styles['deco-line']}></div>
      <Article>
        <div className={styles['big-title-row']}>
          <BothSidebox
            __style={{ alignItems: 'flex-start' }}
            __leftComponent={<>최종 결제 금액</>}
            __rightComponent={<></>} />
        </div>
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text']}>총 상품 금액</div></>}
          __rightComponent={<><div className={styles['price-info-content-text']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalPrice }) }원</div></>} />
        <EmptyRow __style={{ height: '8px' }} />
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text']}>총 배송료</div></>}
          __rightComponent={<><div className={styles['price-info-content-text']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().totalDelivery }) }원</div></>} />
        <EmptyRow __style={{ height: '16px' }} />
        <div className={styles['deco-line']}></div>
        <EmptyRow __style={{ height: '16px' }} />
        <BothSidebox
          __leftComponent={<><div className={styles['price-info-title-text-big']}>총 결제 금액</div></>}
          __rightComponent={<><div className={styles['price-info-content-text-big']}>{ getAddCommaNumberString({ numberValue: getTotalPriceInfo().total }) }원</div></>} />
      </Article>
      <Button __buttonStyle="black-solid" __onClick={submitButtonClick}>결제하기</Button>
      <ModalAddressBook ref={modalAddressBookRef} __onSelected={onAddressSelected} />
    </>
  );
};

export default OrderFormBox;
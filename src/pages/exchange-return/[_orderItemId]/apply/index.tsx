import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTokenCheck from "../../../../components/auth/access-token-check/access-token-check.component";
import Topbar from "../../../../components/layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../../../components/layouts/window-size-container/window-size-container.component";
import styles from './index.module.scss';
import Checkbox from "../../../../components/forms/checkbox/checkbox.component";
import Button from "../../../../components/forms/button/button.component";
import BottomFixedOrRelativeBox from "../../../../components/boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import ProductRowItem3 from "../../../../components/boxes/product-row-item3/product-row-item3.component";
import { ICheckbox } from "../../../../components/forms/checkbox/checkbox.interface";
import useEnumExchangeReturnReasonListQuery from "../../../../hooks/use-queries/use-enum-exchange-return-reason-list.query";
import ModalAddressBook from "../../../../components/modals/modal-address-book/modal-address-book.component";
import { IModalAddressBook } from "../../../../components/modals/modal-address-book/modal-address-book.interface";
import { IAddress } from "../../../../interfaces/address/address.interface";
import TextArea from "../../../../components/forms/text-area/text-area.component";
import { IExchangeReturn } from "../../../../interfaces/exchange-return/exchange-return.interface";
import useModalAlert from "../../../../hooks/use-modals/use-modal-alert.modal";
import useOrderItemDetailApi from "../../../../hooks/use-apis/use-order-item-detail.api";
import { IOrder } from "../../../../interfaces/order/order.interface";
import useItemChangeRequestApi from "../../../../hooks/use-apis/use-item-change-request.api";

const ExchangeReturnApplyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>고필드 교환/반품 신청</title>
        <meta name="description" content="고필드 교환/반품 신청 페이지 입니다." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccessTokenCheck __checkTarget="signup-complete-user">
        <PageContents />
      </AccessTokenCheck>
    </>
  );
};

const PageContents = () => {
  const router = useRouter();
  const orderItemDetailApi = useOrderItemDetailApi();
  const itemChangeRequestApi = useItemChangeRequestApi();
  const [orderItemDetail, setOrderItemDetail] = useState<IOrder.OrderItemDetailInfo>();
  const modalAlert = useModalAlert();
  const modalAddressBookRef = useRef<IModalAddressBook.RefObject>(null);
  const enumExchangeReturnReasonListQuery = useEnumExchangeReturnReasonListQuery();
  const [form, setForm] = useState<IExchangeReturn.ExchangeReturnForm>({});
  const isGettingDetailRef = useRef(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (!enumExchangeReturnReasonListQuery.isFetched) {
      return;
    }

    checkReasonEffectiveness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumExchangeReturnReasonListQuery.isFetched]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    let orderItemId = '';
    if (typeof router.query._orderItemId === 'string') {
      orderItemId = router.query._orderItemId;
      setForm(prev => ({ ...prev, orderItemId }));
    }

    const reasonList = getReasonList();
    if (reasonList.length > 0) {
      setForm(prev => ({ ...prev, reason: reasonList[0] }));
    } else {
      disposeEmptyReasonList(orderItemId);
    }

    if (reasonList.length > 0 && orderItemId !== '') {
      isGettingDetailRef.current = true;
      orderItemDetailApi.getInstance(orderItemId).then((response) => {
        if (response.data.status !== true) {
          return;
        }

        setOrderItemDetail(response.data.data);
        setForm(prev => ({
          ...prev,
          shippingAddress: {
            address: response.data.data.address,
            addressExtra: response.data.data.addressExtra,
            zipCode: response.data.data.zipCode,
            name: response.data.data.username,
            tel: response.data.data.userTel,
          },
        }));
      }).finally(() => {
        isGettingDetailRef.current = false;
      });
    }

    checkReasonEffectiveness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const checkReasonEffectiveness = useCallback(() => {
    if (typeof form.reason !== 'string') return;
    if (enumExchangeReturnReasonListQuery.data === undefined) return;

    if (enumExchangeReturnReasonListQuery.data.find(x => x.value === form.reason) === undefined) {
      modalAlert.show({ title: '안내', content: '유효하지 않은 접근입니다.' });
      router.push('/')
    }
  }, [enumExchangeReturnReasonListQuery.data, form.reason, modalAlert, router]);

  const disposeEmptyReasonList = useCallback((orderItemId: string) => {
    modalAlert.show({ title: '안내', content: '교환/반품 사유를 선택해주세요.' });
    const reasonUrl = `/exchange-return/${orderItemId}/reason`;
    router.push(reasonUrl);
  }, [modalAlert, router]);

  const getReasonList = useCallback(() => {
    const reasonList: string[] = [];

    if (typeof router.query.reasonList === 'string' && router.query.reasonList?.trim() !== '') {
      reasonList.push(router.query.reasonList);
    } else if (Array.isArray(router.query.reasonList)) {
      router.query.reasonList.forEach((item) => {
        if (typeof item === 'string' && item?.trim() !== '') {
          reasonList.push(item);
        }
      });
    }

    return reasonList;
  }, [router.query.reasonList]);

  const addressChangeButtonClick = useCallback(() => {
    modalAddressBookRef.current?.show();
  }, []);

  const onAddressSelected = useCallback((item: IAddress.AddressItem) => {
    setForm(prev => ({
      ...prev,
      shippingAddress: {
        name: item.name,
        tel: item.tel,
        address: item.address,
        addressExtra: item.addressExtra,
        zipCode: item.zipCode,
      },
    }));
  }, []);

  const exchangeOrReturnCheckboxChange = useCallback((changeInfo: ICheckbox.CheckboxChangeInfo) => {
    setForm(prev => ({ ...prev, applyType: changeInfo.value }));
  }, []);

  const onExchangeDetailContentChange = useCallback((value: string) => {
    setForm(prev => ({ ...prev, exchangeDetailContent: value }));
  }, []);

  const prevButtonClick = useCallback(() => {
    history.back();
  }, []);

  const requestExchange = useCallback(() => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    itemChangeRequestApi.getInstance(form).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      modalAlert.show({ title: '안내', content: '교환 신청이 완료되었습니다.' });
      router.push('/');
    }).finally(() => {
      isSubmittingRef.current = false;
    });
  }, [form, itemChangeRequestApi, modalAlert, router]);

  const requestReturn = useCallback(() => {

  }, []);

  const applyButtonClick = useCallback(() => {
    if (typeof form.orderItemId !== 'string' || form.orderItemId === '') {
      modalAlert.show({ title: '안내', content: '교환/반품 대상 상품 정보를 찾을 수 없습니다.' });
      return;
    }

    if (typeof form.reason !== 'string' || form.reason === '') {
      modalAlert.show({ title: '안내', content: '교환/반품 사유 정보를 찾을 수 없습니다.' });
      return;
    }

    if (typeof form.applyType !== 'string' || form.applyType === '') {
      modalAlert.show({ title: '안내', content: '교환인지 반품인지 선택해주세요.' });
      return;
    }

    if (form.shippingAddress === undefined) {
      modalAlert.show({ title: '안내', content: '배송 정보를 확인해주세요.' });
      return;
    }

    console.log('form', form);

    if (form.applyType === 'exchange') {
      // 교환 요청 
      requestExchange();
    } else if (form.applyType === 'return') {
      // 반품 요청 
      requestReturn();
    }
  }, [form, modalAlert, requestExchange, requestReturn]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>교환/반품 신청</>,
          }} />
        
        {/* <div className="block mx-6 mt-4">
          <div className="block font-bold text-base">
            선택한 상품 1건
          </div>
        </div> */}
        <ProductRowItem3 
          __isTopRowShow={false}
          __imageUrl={orderItemDetail?.thumbnail}
          __price={orderItemDetail?.itemPrice}
          __deliveryPrice={orderItemDetail?.deliveryPrice}
          __productName={orderItemDetail?.name}
          __optionNames={orderItemDetail?.optionName}
          __qty={orderItemDetail?.qty} />

        <div className="block mx-6 mt-4">
          <div className="font-bold text-sm text-black-a mb-1">
            교환/빈품 사유
          </div>
          <div className="font-normal text-sm text-gray-b">
            { enumExchangeReturnReasonListQuery.data?.find(x => x.value === form.reason)?.text }
          </div>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          어떤 해결 방법을 원하세요?
        </div>
        
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="exchange" __checkState={form.applyType === 'exchange' ? 'checked' : 'none-checked'} __onChange={exchangeOrReturnCheckboxChange}>
            교환
          </Checkbox>
        </div>
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="return" __checkState={form.applyType === 'return' ? 'checked' : 'none-checked'} __onChange={exchangeOrReturnCheckboxChange}>
            반품
          </Checkbox>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        { 
          form.applyType === 'exchange' ? 
          <>
            <div className="font-bold text-base text-black-a mx-6 mb-4">
              교환 내용
            </div>
            
            <div className="w-full box-sizing px-6 mb-2">
              <TextArea
                __placeholder="원하는 교환 옵션을 작성해주세요."
                __value={form.exchangeDetailContent}
                __onChange={onExchangeDetailContentChange} />
            </div>

            <div className="block h-px bg-gray-a mx-6 my-4"></div>
          </> : <></>
        }

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          배송 정보를 확인해 주세요
        </div>

        <div className="font-normal text-sm text-black-a mx-6 mb-1">
          { form.shippingAddress?.name }
        </div>
        <div className="font-normal text-sm text-gray-b mx-6 mb-1">
          ({ form.shippingAddress?.zipCode }) { form.shippingAddress?.address }, { form.shippingAddress?.addressExtra }
        </div>
        <div className="font-normal text-sm text-gray-b mx-6 mb-4">
          { form.shippingAddress?.tel }
        </div>
        <div className="mx-6 mb-4">
          <Button 
            __buttonStyle="white-solid-gray-stroke-radius" 
            __style={{ padding: '6px 10px' }}
            __onClick={addressChangeButtonClick}>
            주소 변경하기
          </Button>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={prevButtonClick}>이전단계</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid" __onClick={applyButtonClick}>신청하기</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>

      </WindowSizeContainer>
      
      <ModalAddressBook ref={modalAddressBookRef} __onSelected={onAddressSelected} />
    </>
  );
};

export default ExchangeReturnApplyPage;
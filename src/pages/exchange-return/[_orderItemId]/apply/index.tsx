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
import useItemReturnRequestApi from "../../../../hooks/use-apis/use-item-return-request.api";

const ExchangeReturnApplyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>????????? ??????/?????? ??????</title>
        <meta name="description" content="????????? ??????/?????? ?????? ????????? ?????????." />
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
  const itemReturnRequestApi = useItemReturnRequestApi();
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
      modalAlert.show({ title: '??????', content: '???????????? ?????? ???????????????.' });
      router.push('/')
    }
  }, [enumExchangeReturnReasonListQuery.data, form.reason, modalAlert, router]);

  const disposeEmptyReasonList = useCallback((orderItemId: string) => {
    modalAlert.show({ title: '??????', content: '??????/?????? ????????? ??????????????????.' });
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

      modalAlert.show({ title: '??????', content: '?????? ????????? ?????????????????????.' });
      router.push('/order/history?originType=exchange-or-return');
    }).finally(() => {
      isSubmittingRef.current = false;
    });
  }, [form, itemChangeRequestApi, modalAlert, router]);

  const requestReturn = useCallback(() => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    itemReturnRequestApi.getInstance(form).then((response) => {
      if (response.data.status !== true) {
        return;
      }

      modalAlert.show({ title: '??????', content: '?????? ????????? ?????????????????????.' });
      router.push('/order/history?originType=exchange-or-return');
    }).finally(() => {
      isSubmittingRef.current = false;
    });
  }, [form, itemReturnRequestApi, modalAlert, router]);

  const applyButtonClick = useCallback(() => {
    if (typeof form.orderItemId !== 'string' || form.orderItemId === '') {
      modalAlert.show({ title: '??????', content: '??????/?????? ?????? ?????? ????????? ?????? ??? ????????????.' });
      return;
    }

    if (typeof form.reason !== 'string' || form.reason === '') {
      modalAlert.show({ title: '??????', content: '??????/?????? ?????? ????????? ?????? ??? ????????????.' });
      return;
    }

    if (typeof form.applyType !== 'string' || form.applyType === '') {
      modalAlert.show({ title: '??????', content: '???????????? ???????????? ??????????????????.' });
      return;
    }

    if (form.shippingAddress === undefined) {
      modalAlert.show({ title: '??????', content: '?????? ????????? ??????????????????.' });
      return;
    }

    // console.log('form', form);

    if (form.applyType === 'exchange') {
      // ?????? ?????? 
      requestExchange();
    } else if (form.applyType === 'return') {
      // ?????? ?????? 
      requestReturn();
    }
  }, [form, modalAlert, requestExchange, requestReturn]);

  return (
    <>
      <WindowSizeContainer __bgColor="#fff">
        <Topbar
          __layoutTypeA={{
            titleComponent: <>??????/?????? ??????</>,
          }} />
        
        {/* <div className="block mx-6 mt-4">
          <div className="block font-bold text-base">
            ????????? ?????? 1???
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
            ??????/?????? ??????
          </div>
          <div className="font-normal text-sm text-gray-b">
            { enumExchangeReturnReasonListQuery.data?.find(x => x.value === form.reason)?.text }
          </div>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          ?????? ?????? ????????? ?????????????
        </div>
        
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="exchange" __checkState={form.applyType === 'exchange' ? 'checked' : 'none-checked'} __onChange={exchangeOrReturnCheckboxChange}>
            ??????
          </Checkbox>
        </div>
        <div className="w-full box-sizing px-6 mb-2">
          <Checkbox __name="exchange-or-return" __value="return" __checkState={form.applyType === 'return' ? 'checked' : 'none-checked'} __onChange={exchangeOrReturnCheckboxChange}>
            ??????
          </Checkbox>
        </div>

        <div className="block h-px bg-gray-a mx-6 my-4"></div>

        { 
          form.applyType === 'exchange' ? 
          <>
            <div className="font-bold text-base text-black-a mx-6 mb-4">
              ?????? ??????
            </div>
            
            <div className="w-full box-sizing px-6 mb-2">
              <TextArea
                __placeholder="????????? ?????? ????????? ??????????????????."
                __value={form.exchangeDetailContent}
                __onChange={onExchangeDetailContentChange} />
            </div>

            <div className="block h-px bg-gray-a mx-6 my-4"></div>
          </> : <></>
        }

        <div className="font-bold text-base text-black-a mx-6 mb-4">
          ?????? ????????? ????????? ?????????
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
            ?????? ????????????
          </Button>
        </div>

        <BottomFixedOrRelativeBox __heightToRelative={100}>
          <div className="w-full px-6 pb-6 grid grid-cols-2 gap-2 mt-4">
            <div>
              <Button __buttonStyle="white-solid-gray-stroke" __onClick={prevButtonClick}>????????????</Button>
            </div>
            <div>
              <Button __buttonStyle="black-solid" __onClick={applyButtonClick}>????????????</Button>
            </div>
          </div>
        </BottomFixedOrRelativeBox>

      </WindowSizeContainer>
      
      <ModalAddressBook ref={modalAddressBookRef} __onSelected={onAddressSelected} />
    </>
  );
};

export default ExchangeReturnApplyPage;
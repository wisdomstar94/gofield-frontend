import styles from "./modal-bottom-product-options.component.module.scss";
import { IModalBottomProductOptions } from "./modal-bottom-product-options.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ModalBottom from "../../forms/modal-bottom/modal-bottom.component";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";
import SvgCloseIcon from "../../svgs/svg-close-icon/svg-close-icon.component";
import SelectBox from "../../forms/select-box/select-box.component";
import Button from "../../forms/button/button.component";
import { useRouter } from "next/router";
import useItemProductOptionListApi from "../../../hooks/use-apis/use-item-product-option-list.api";
import { IItem } from "../../../interfaces/item/item.interface";
import { ICommon } from "../../../interfaces/common/common.interface";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";
import useCartContainApi from "../../../hooks/use-apis/use-cart-contain.api";
import useCartCountQuery from "../../../hooks/use-queries/use-cart-count.query";

const ModalBottomProductOptions = forwardRef((props: IModalBottomProductOptions.Props, ref: ForwardedRef<IModalBottomProductOptions.RefObject>) => {
  const router = useRouter();
  const modalAlert = useModalAlert();
  const [modalState, setModalState] = useState<IModalBottom.ModalState>(props.__modalState ?? '');
  const itemProductOptionListApi = useItemProductOptionListApi();
  const cartContainApi = useCartContainApi();
  
  const cartCountQuery = useCartCountQuery();

  const isCartContainingRef = useRef(false);

  const [optionGroupList, setOptionGroupList] = useState<IItem.OptionGroupItem[]>([]);
  const optionListRef = useRef<IItem.OptionItem[]>([]);

  // const optionGroupSelectInfoRef = useRef<Map<number, ICommon.ValueItem | undefined>>(new Map<number, ICommon.ValueItem | undefined>());
  const [optionGroupSelectInfo, setOptionGroupSelectInfo] = useState<Map<number, ICommon.ValueItem | undefined>>(new Map<number, ICommon.ValueItem | undefined>());

  const [price, setPrice] = useState(props.__price);
  useEffect(() => { setPrice(props.__price); }, [props.__price]);

  const [itemId, setItemId] = useState(props.__itemId);
  useEffect(() => { setItemId(props.__itemId); }, [props.__itemId]);

  const [itemNumber, setItemNumber] = useState(props.__itemNumber);
  useEffect(() => { setItemNumber(props.__itemNumber); }, [props.__itemNumber]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof itemId !== 'string') {
      return;
    }

    itemProductOptionListApi.getInstance(itemId).then((response) => {
      if (response.data.data.optionGroupList === null || response.data.data.optionList === null) {
        return;
      }

      // console.log('res', response);
      setOptionGroupList(response.data.data.optionGroupList);
      optionListRef.current = response.data.data.optionList;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, itemId]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  const closeIconButtonClick = useCallback(() => {
    hide();
  }, [hide]);

  const isRequiredOptionSelected = useCallback(() => {
    for (const item of optionGroupList) {
      if (optionGroupSelectInfo.get(item.id) === undefined && item.isEssential === true) {
        return false;
      }
    }
    return true;
  }, [optionGroupList, optionGroupSelectInfo]);

  const clear = useCallback(() => {
    hide();
    setOptionGroupSelectInfo(new Map());
  }, [hide]);

  const containBasketButtonClick = useCallback(() => {
    let targetItemNumber = '';

    if (optionGroupList.length > 0) {
      if (!isRequiredOptionSelected()) {
        modalAlert.show({ title: '안내', content: '옵션을 모두 선택해주세요.' });
        return;
      }

      if (isCartContainingRef.current) {
        modalAlert.show({ title: '안내', content: '잠시 후 다시 시도해주세요.' });
        return;
      }

      // console.log('optionGroupSelectInfoRef.current', optionGroupSelectInfoRef.current);
      console.log('optionGroupSelectInfo', optionGroupSelectInfo);

      const optionGroupSelectOptionNames = Array.from(optionGroupSelectInfo.values()).map(item => item?.text + '');
      console.log('optionGroupSelectOptionNames', optionGroupSelectOptionNames);

      const targetOptionItem = optionListRef.current.find((item) => {
        const result = item.name.every((item) => {
          return optionGroupSelectOptionNames.includes(item);
        });
        return result;
      });
      if (targetOptionItem === undefined) {
        modalAlert.show({ title: '안내', content: '옵션과 일치하는 상품이 없습니다.' });
        return;
      }
      targetItemNumber = targetOptionItem.itemNumber;
    } else if (optionGroupList.length === 0) {
      if (typeof itemNumber !== 'string' || itemNumber?.trim() === '') {
        modalAlert.show({ title: '안내', content: '상품 정보를 가져오지 못했습니다.' });
        return;
      }
      targetItemNumber = itemNumber;
    }

    // console.log('targetOptionItem', targetOptionItem);

    // 장바구니 담기..
    isCartContainingRef.current = true;
    cartContainApi.getInstance(false, targetItemNumber).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '장바구니 담기에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '장바구니에 상품이 담겼습니다.' });
      cartCountQuery.refetch();
      clear();
    }).finally(() => {
      isCartContainingRef.current = false;
    });
  }, [cartContainApi, cartCountQuery, clear, isRequiredOptionSelected, itemNumber, modalAlert, optionGroupList.length, optionGroupSelectInfo]);

  const getTotalPrice = useCallback(() => {
    if (price === undefined) {
      return 'null';
    }

    let returnPrice = price;
    optionGroupSelectInfo.forEach((value, key) => {
      const p = Number(value?.value.split('@@_@@')[1]);
      returnPrice += p;
    });

    return getAddCommaNumberString({ numberValue: returnPrice });
  }, [optionGroupSelectInfo, price]);

  return (
    <>
      <ModalBottom __modalState={modalState}>
        <div className={`w-full grid grid-cols-9 box-sizing pt-4 px-4${optionGroupList.length !== 0 ? ' pb-4' : ''}`}>
          <div className="col-span-3 flex flex-wrap items-center justify-start">

          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-center">
            {
              optionGroupList.length !== 0 ? 
              <span className="font-bold text-black tracking-tighter text-base">옵션 선택</span> : 
              <span className="font-bold text-black tracking-tighter text-base">본 상품은 옵션이 없는 상품입니다.</span>
            }
          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-end">
            <span className="inline-flex cursor-pointer" onClick={closeIconButtonClick}>
              <SvgCloseIcon />
            </span>
          </div>
        </div>
        <div className="block w-full box-sizing px-6">
          {
            optionGroupList.map((item, index) => {
              return (
                <div className="block mb-2" key={index}>
                  <SelectBox
                    __placeholder={item.groupTitle}
                    __valueItems={item.optionGroup.map((x) => ({ text: x.name, value: x.name + '@@_@@' + x.price.toString() }))}
                    __onChange={(value, valueItem) => {
                      // optionGroupSelectInfoRef.current.set(item.id, valueItem);
                      setOptionGroupSelectInfo((prev) => new Map(prev).set(item.id, valueItem));
                    }} />
                </div>
              );
            })
          }
        </div>
        
        <div className="w-full h-px bg-gray-a my-6"></div>

        <div className="w-full box-sizing px-6 grid grid-cols-2 mb-6">
          <div className="flex flex-wrap justify-start items-center">
            <span className="text-sm text-black-a tracking-tighter font-bold">상품 금액</span>
          </div>
          <div className="flex flex-wrap justify-end items-center">
            <span className="text-sm text-orange-a tracking-tighter font-bold">{ getTotalPrice() }원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2">
          <div>
            <Button __buttonStyle="white-solid-gray-stroke" __onClick={containBasketButtonClick}>장바구니 담기</Button>
          </div>
          <div>
            <Button __buttonStyle="black-solid">바로 구매하기</Button>
          </div>
        </div>
      </ModalBottom>
    </>
  );
});
ModalBottomProductOptions.displayName = 'ModalBottomProductOptions';

export default ModalBottomProductOptions;
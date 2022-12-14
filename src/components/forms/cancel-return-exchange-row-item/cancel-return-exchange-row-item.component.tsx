import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useCartContainApi from "../../../hooks/use-apis/use-cart-contain.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import useCartCountQuery from "../../../hooks/use-queries/use-cart-count.query";
import useEnumOrderCancelExchangeReturnStatusListQuery from "../../../hooks/use-queries/use-enum-order-cancel-exchange-return-status-list.query";
import { day } from "../../../librarys/date-util/date-util.library";
import BottomMenuBar from "../../layouts/bottom-menu-bar/bottom-menu-bar.component";
import Button from "../button/button.component";
import styles from "./cancel-return-exchange-row-item.component.module.scss";
import { ICancelReturnExchangeRowItem } from "./cancel-return-exchange-row-item.interface";

const CancelReturnExchangeRowItem = (props: ICancelReturnExchangeRowItem.Props) => {
  const router = useRouter();
  const enumOrderCancelExchangeReturnStatusListQuery = useEnumOrderCancelExchangeReturnStatusListQuery();
  const cartContainApi = useCartContainApi();
  const cartCountQuery = useCartCountQuery();
  const modalAlert = useModalAlert();
  const isCartContainingRef = useRef(false);

  const [groupItem, setGroupItem] = useState(props.__groupItem);
  useEffect(() => { setGroupItem(props.__groupItem) }, [props.__groupItem]);

  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item) }, [props.__item]);

  const isOptionExist = useCallback((optionName: null | undefined | string[]) => {
    if (optionName === undefined || optionName === null) {
      return false;
    }
    
    if (optionName.length === 0) {
      return false;
    }

    return true;
  }, []);
  
  const detailViewButtonClick = useCallback(() => {
    router.push(`/cancel-return-exchange/${groupItem?.id}`);
  }, [groupItem?.id, router]);

  const containCartButtonClick = useCallback(() => {
    if (typeof item?.itemNumber !== 'string') {
      modalAlert.show({ title: '??????', content: '??????????????? ?????? ?????? ????????? ????????????.' });
      return;
    }

    isCartContainingRef.current = true;
    cartContainApi.getInstance(false, item?.itemNumber).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '??????', content: '???????????? ????????? ?????????????????????.' });
        return;
      }

      modalAlert.show({ title: '??????', content: '??????????????? ????????? ???????????????.' });
      cartCountQuery.refetch();
    }).finally(() => {
      isCartContainingRef.current = false;
    });
  }, [cartContainApi, cartCountQuery, item?.itemNumber, modalAlert]);

  return (
    <>
      <div className="w-full block">
        <div className="block px-6 py-4 box-sizing">
          
          <div className="w-full grid grid-cols-2 mb-2">
            <div className="flex items-center">
              <span className="text-sm font-bold tracking-tighter">
                {/* 2022.02.01 */}
                { day(new Date(groupItem?.createDate ?? '')).format('YYYY-MM-DD') }
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-bold tracking-tighter text-blue-a cursor-pointer" onClick={detailViewButtonClick}>
                ???????????? {'>'}
              </span>
            </div>
          </div>

          <div className="w-full flex mb-2">
            <span className="text-sm text-black-a tracking-tighter font-normal">
              {/* ????????? ????????? ???????????? ?????? (9.5??? ??????) */}
              { item?.name }
            </span>
          </div>

          {
            isOptionExist(item?.optionName) ? 
            <div className="w-full flex mb-2">
              <span className="text-sm text-black-b tracking-tighter font-normal">
                {/* ????????? ????????? ???????????? ?????? (9.5??? ??????) */}
                { item?.optionName?.join(', ') }
              </span>
            </div> : 
            <></>
          }

          <div className="w-full mb-4 grid grid-cols-12">
            <div className="col-span-3">
              <span className="text-sm font-bold tracking-tighter text-blue-a">
                {/* ???????????? */}
                { enumOrderCancelExchangeReturnStatusListQuery.data?.find(x => x.value === groupItem?.status)?.text }
              </span>
            </div>
            <div className="col-span-9">
              <span className="text-sm text-black-a tracking-tighter font-normal">
                {/* 2022.10.7(???) ?????? ????????? ?????? ?????? ?????? */}
                { groupItem?.comment }
              </span>
            </div>
          </div>

          <div className="w-full flex">
            <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '6px 14px' }} __onClick={containCartButtonClick}>
              <span className="text-sm font-bold">???????????? ??????</span>
            </Button>
          </div>

        </div>

        <div className="block h-px mx-6 bg-gray-a"></div>

      </div>
    </>
  );
};

export default CancelReturnExchangeRowItem;
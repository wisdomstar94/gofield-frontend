import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useEnumOrderCancelExchangeReturnStatusListQuery from "../../../hooks/use-queries/use-enum-order-cancel-exchange-return-status-list.query";
import { day } from "../../../librarys/date-util/date-util.library";
import BottomMenuBar from "../../layouts/bottom-menu-bar/bottom-menu-bar.component";
import Button from "../button/button.component";
import styles from "./cancel-return-exchange-row-item.component.module.scss";
import { ICancelReturnExchangeRowItem } from "./cancel-return-exchange-row-item.interface";

const CancelReturnExchangeRowItem = (props: ICancelReturnExchangeRowItem.Props) => {
  const router = useRouter();
  const enumOrderCancelExchangeReturnStatusListQuery = useEnumOrderCancelExchangeReturnStatusListQuery();

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
                상세보기 {'>'}
              </span>
            </div>
          </div>

          <div className="w-full flex mb-2">
            <span className="text-sm text-black-a tracking-tighter font-normal">
              {/* 페르마 플러스 드라이버 헤드 (9.5도 단품) */}
              { item?.name }
            </span>
          </div>

          {
            isOptionExist(item?.optionName) ? 
            <div className="w-full flex mb-2">
              <span className="text-sm text-black-b tracking-tighter font-normal">
                {/* 페르마 플러스 드라이버 헤드 (9.5도 단품) */}
                { item?.optionName?.join(', ') }
              </span>
            </div> : 
            <></>
          }

          <div className="w-full mb-4 grid grid-cols-12">
            <div className="col-span-3">
              <span className="text-sm font-bold tracking-tighter text-blue-a">
                {/* 취소완료 */}
                { enumOrderCancelExchangeReturnStatusListQuery.data?.find(x => x.value === groupItem?.status)?.text }
              </span>
            </div>
            <div className="col-span-9">
              <span className="text-sm text-black-a tracking-tighter font-normal">
                {/* 2022.10.7(토) 이내 카드사 환불 완료 예정 */}
                { groupItem?.comment }
              </span>
            </div>
          </div>

          <div className="w-full flex">
            <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '6px 14px' }}><span className="text-sm font-bold">장바구니 담기</span></Button>
          </div>

        </div>

        <div className="block h-px mx-6 bg-gray-a"></div>

      </div>
    </>
  );
};

export default CancelReturnExchangeRowItem;
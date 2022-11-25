import BottomMenuBar from "../../layouts/bottom-menu-bar/bottom-menu-bar.component";
import Button from "../button/button.component";
import styles from "./cancel-return-exchange-row-item.component.module.scss";
import { ICancelReturnExchangeRowItem } from "./cancel-return-exchange-row-item.interface";

const CancelReturnExchangeRowItem = (props: ICancelReturnExchangeRowItem.Props) => {
  return (
    <>
      <div className="w-full block">
        <div className="block px-6 py-4 box-sizing">
          
          <div className="w-full grid grid-cols-2 mb-2">
            <div className="flex items-center">
              <span className="text-sm font-bold tracking-tighter">2022.02.01</span>
            </div>
            <div className="flex items-center justify-end">
              <span className="text-sm font-bold tracking-tighter text-blue-a cursor-pointer">취소 상세보기 {'>'}</span>
            </div>
          </div>

          <div className="w-full flex mb-2">
            <span className="text-sm text-black-a tracking-tighter font-normal">페르마 플러스 드라이버 헤드 (9.5도 단품)</span>
          </div>

          <div className="w-full mb-4 grid grid-cols-12">
            <div className="col-span-3">
              <span className="text-sm font-bold tracking-tighter text-blue-a">취소완료</span>
            </div>
            <div className="col-span-9">
              <span className="text-sm text-black-a tracking-tighter font-normal">2022.10.7(토) 이내 카드사 환불 완료 예정</span>
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
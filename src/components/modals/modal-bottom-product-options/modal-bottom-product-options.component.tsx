import styles from "./modal-bottom-product-options.component.module.scss";
import { IModalBottomProductOptions } from "./modal-bottom-product-options.interface";
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from "react";
import ModalBottom from "../../forms/modal-bottom/modal-bottom.component";
import { IModalBottom } from "../../forms/modal-bottom/modal-bottom.interface";
import SvgCloseIcon from "../../svgs/svg-close-icon/svg-close-icon.component";
import SelectBox from "../../forms/select-box/select-box.component";
import Button from "../../forms/button/button.component";

const ModalBottomProductOptions = forwardRef((props: IModalBottomProductOptions.Props, ref: ForwardedRef<IModalBottomProductOptions.RefObject>) => {
  const [modalState, setModalState] = useState<IModalBottom.ModalState>(props.__modalState ?? '');

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

  return (
    <>
      <ModalBottom __modalState={modalState}>
        <div className="w-full grid grid-cols-9 box-sizing py-4 px-4">
          <div className="col-span-3 flex flex-wrap items-center justify-start">

          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-center">
            <span className="font-bold text-black tracking-tighter text-base">옵션 선택</span>
          </div>
          <div className="col-span-3 flex flex-wrap items-center justify-end">
            <span className="inline-flex cursor-pointer" onClick={closeIconButtonClick}>
              <SvgCloseIcon />
            </span>
          </div>
        </div>
        <div className="block w-full box-sizing px-6">
          <div className="block mb-2">
            <SelectBox
              __placeholder="옵션1"
              __valueItems={[
                { text: '옵션1', value: '1' },
                { text: '옵션2', value: '2' },
              ]} />
          </div>
          <div className="block mb-2">
            <SelectBox
              __placeholder="옵션2"
              __valueItems={[
                { text: '옵션1', value: '1' },
                { text: '옵션2', value: '2' },
              ]} />
          </div>
        </div>
        
        <div className="w-full h-px bg-gray-a my-6"></div>

        <div className="w-full box-sizing px-6 grid grid-cols-2 mb-6">
          <div className="flex flex-wrap justify-start items-center">
            <span className="text-sm text-black-a tracking-tighter font-bold">상품 금액</span>
          </div>
          <div className="flex flex-wrap justify-end items-center">
            <span className="text-sm text-orange-a tracking-tighter font-bold">51,600원</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2">
          <div>
            <Button __buttonStyle="white-solid-gray-stroke">장바구니 담기</Button>
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
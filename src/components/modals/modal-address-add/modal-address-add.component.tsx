import styles from "./modal-address-add.component.module.scss";
import { IModalAddressAdd } from "./modal-address-add.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { IModal } from "../../forms/modal/modal.interface";
import Modal from "../../forms/modal/modal.component";
import Topbar from "../../layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";

const ModalAddressAdd = forwardRef((props: IModalAddressAdd.Props, ref: ForwardedRef<IModalAddressAdd.RefObject>) => {
  const [modalState, setModalState] = useState<IModal.ModalState | undefined>(props.__modalState);
  useEffect(() => { setModalState(props.__modalState) }, [props.__modalState]);

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

  return (
    <>
      <Modal __modalState={modalState}>
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __backButtonClickCallback={() => { setModalState('hide') }}
            __layoutTypeB={{
              titleComponent: <>주소 추가</>,
              rightComponent: <></>,
            }} />
          
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalAddressAdd.displayName = 'ModalAddressAdd';

export default ModalAddressAdd;
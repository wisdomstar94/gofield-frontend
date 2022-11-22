import styles from "./modal-address-book.component.module.scss";
import { IModalAddressBook } from "./modal-address-book.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Modal from "../../forms/modal/modal.component";
import { IModal } from "../../forms/modal/modal.interface";
import Topbar from "../../layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";
import AddressBookItem from "../../boxes/address-book-item/address-book-item.component";
import BottomFixedOrRelativeBox from "../../boxes/bottom-fixed-or-relative-box/bottom-fixed-or-relative-box.component";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";

const ModalAddressBook = forwardRef((props: IModalAddressBook.Props, ref: ForwardedRef<IModalAddressBook.RefObject>) => {
  const addressBookItemsLastBottomElementRef = useRef<HTMLDivElement>(null);
  const [isBottomButtonFixed, setIsBottomButtonFixed] = useState<boolean>(false);
  const [modalState, setModalState] = useState<IModal.ModalState | undefined>(props.__modalState);
  useEffect(() => { setModalState(props.__modalState) }, [props.__modalState]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const windowSizeCheck = useCallback(() => {
    if (typeof window === undefined) {
      return;
    }

    if (addressBookItemsLastBottomElementRef.current === null) {
      return;
    }

    const windowHeight = window.innerHeight;
    if (windowHeight - 50 < addressBookItemsLastBottomElementRef.current?.getBoundingClientRect().top) {
      setIsBottomButtonFixed(false);
    } else {
      setIsBottomButtonFixed(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.removeEventListener('resize', windowSizeCheck);
    window.addEventListener('resize', windowSizeCheck);
    windowSizeCheck();

    return () => {
      window.removeEventListener('resize', windowSizeCheck);
    };
  }, [windowSizeCheck]);
  
  const newAddressItemAddButtonClick = useCallback(() => {
    
  }, []);

  return (
    <>
      <Modal __modalState={modalState}>
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __backButtonClickCallback={() => { setModalState('hide') }}
            __layoutTypeB={{
              titleComponent: <>주소록</>,
              rightComponent: <></>,
            }} />
          <AddressBookItem />
          <AddressBookItem />
          <div ref={addressBookItemsLastBottomElementRef}></div>
          <BottomFixedOrRelativeBox __isFixed={isBottomButtonFixed}>
            <Button __buttonStyle="black-solid" __onClick={newAddressItemAddButtonClick}>+ 새 주소 추가하기</Button>
          </BottomFixedOrRelativeBox>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalAddressBook.displayName = 'ModalAddressBook';

export default ModalAddressBook;
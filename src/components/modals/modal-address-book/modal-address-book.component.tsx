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
import ModalAddressAdd from "../modal-address-add/modal-address-add.component";
import { IModalAddressAdd } from "../modal-address-add/modal-address-add.interface";
import useUserAddressListApi from "../../../hooks/use-apis/use-user-address-list.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import { IAddress } from "../../../interfaces/address/address.interface";

const ModalAddressBook = forwardRef((props: IModalAddressBook.Props, ref: ForwardedRef<IModalAddressBook.RefObject>) => {
  const userAddressListApi = useUserAddressListApi();
  const modalAddressAddRef = useRef<IModalAddressAdd.RefObject>(null);
  const modalAlert = useModalAlert();
  const isGettingListRef = useRef(false);
  const [modalState, setModalState] = useState<IModal.ModalState | undefined>(props.__modalState);
  useEffect(() => { setModalState(props.__modalState) }, [props.__modalState]);
  
  const [list, setList] = useState<IAddress.AddressItem[]>([]);

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
  
  const newAddressItemAddButtonClick = useCallback(() => {
    modalAddressAddRef.current?.show();
  }, []);

  const getList = useCallback(() => {
    if (isGettingListRef.current) {
      return;
    }

    isGettingListRef.current = true;
    userAddressListApi.getInstance().then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '주소록 목록을 가져오는데 실패하였습니다.' });
        return;
      }

      setList(response.data.data);
    }).finally(() => {
      isGettingListRef.current = false;
    });
  }, [modalAlert, userAddressListApi]);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddSubmitComplete = useCallback(() => {
    getList();
  }, [getList]);

  const onDeleteComplete = useCallback((item: IAddress.AddressItem) => {
    getList();
  }, [getList]);

  const onEditComplete = useCallback((item: IAddress.AddressItem) => {
    getList();
  }, [getList]);

  const onSelectButtonClick = useCallback((item: IAddress.AddressItem) => {
    if (typeof props.__onSelected === 'function') {
      props.__onSelected(item);
      hide();
    }
  }, [hide, props]);

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
          <div className="w-full relative">
            {
              list.map((item, index) => {
                return (
                  <AddressBookItem 
                    key={index}
                    __item={item}
                    __onDeleteComplete={onDeleteComplete}
                    __onEditComplete={onEditComplete}
                    __onSelectButtonClick={onSelectButtonClick} />
                );  
              })
            }
          </div>
          {/* <AddressBookItem />
          <AddressBookItem /> */}
          <BottomFixedOrRelativeBox __heightToRelative={100}>
            <Button __buttonStyle="black-solid" __onClick={newAddressItemAddButtonClick}>+ 새 주소 추가하기</Button>
          </BottomFixedOrRelativeBox>
        </WindowSizeContainer>
      </Modal>
      <ModalAddressAdd ref={modalAddressAddRef} __onSubmitComplete={onAddSubmitComplete} />
    </>
  );
});
ModalAddressBook.displayName = 'ModalAddressBook';

export default ModalAddressBook;
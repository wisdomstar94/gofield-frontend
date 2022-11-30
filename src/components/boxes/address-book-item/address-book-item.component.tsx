import { useCallback, useEffect, useRef, useState } from "react";
import useUserAddressDeleteApi from "../../../hooks/use-apis/use-user-address-delete.api";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";
import Button from "../../forms/button/button.component";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import ModalAddressAdd from "../../modals/modal-address-add/modal-address-add.component";
import { IModalAddressAdd } from "../../modals/modal-address-add/modal-address-add.interface";
import styles from "./address-book-item.component.module.scss";
import { IAddressBookItem } from "./address-book-item.interface";

const AddressBookItem = (props: IAddressBookItem.Props) => {
  const modalAddressAddRef = useRef<IModalAddressAdd.RefObject>(null);
  const userAddressDeleteApi = useUserAddressDeleteApi();
  const isDeletingRef = useRef(false);
  const modalAlert = useModalAlert();

  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item); }, [props.__item]);

  const editButtonClick = useCallback(() => {
    modalAddressAddRef.current?.show();
  }, []);

  const deleteButtonClick = useCallback(() => {
    if (item === undefined || isDeletingRef.current) {
      return;
    }

    isDeletingRef.current = true;
    userAddressDeleteApi.getInstance(item.id).then((response) => {
      if (response.data.status !== true) {
        modalAlert.show({ title: '안내', content: '주소 삭제에 실패하였습니다.' });
        return;
      }

      modalAlert.show({ title: '안내', content: '주소가 삭제되었습니다.' });
      if (typeof props.__onDeleteComplete === 'function') {
        props.__onDeleteComplete(item);
      }
    }).finally(() => {
      isDeletingRef.current = false;
    });
  }, [item, modalAlert, props, userAddressDeleteApi]);

  const onEditSubmitComplete = useCallback(() => {
    if (item === undefined) {
      return;
    }

    if (typeof props.__onEditComplete === 'function') {
      props.__onEditComplete(item);
    }
  }, [item, props]);

  const selectButtonClick = useCallback(() => {
    if (item === undefined) {
      return;
    }

    if (typeof props.__onSelectButtonClick === 'function') {
      props.__onSelectButtonClick(item);
    }
  }, [item, props]);

  return (
    <>
      <List __style={{ padding: '16px 24px' }} __direction="vertical" __width="100%" __defaultItemMarginBottom="4px">
        <ListItem>
          <div className={styles['getter-name-text']}>{ item?.name }</div>
        </ListItem>
        <ListItem>
          <div className={styles['address-text']}>({ item?.zipCode }) { item?.address },&nbsp;{ item?.addressExtra }</div>
        </ListItem>
        <ListItem __marginBottom="10px">
          <div className={styles['cp-text']}>{ item?.tel }</div>
        </ListItem>
        <ListItem __marginBottom="0">
          <BothSidebox
            __leftComponent={<>
              <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }} __onClick={editButtonClick}>
                수정
              </Button>&nbsp;
              <Button __buttonStyle="gray-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }} __onClick={deleteButtonClick}>
                <span style={{ color: '#ff6247' }}>삭제</span>
              </Button>
            </>}
            __rightComponent={<>
              <Button __buttonStyle="black-solid-radius" __style={{ width: 'auto', padding: '8px 16px' }} __onClick={selectButtonClick}>
                선택
              </Button>
            </>} />
        </ListItem>
      </List>
      <div className={styles['border-bottom-box']}></div>
      <ModalAddressAdd ref={modalAddressAddRef} __mode="edit" __detailInfo={item} __onSubmitComplete={onEditSubmitComplete} />
    </>
  );
};

export default AddressBookItem;
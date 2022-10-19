import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import AddressRowItem from "../../forms/address-row-item/address-row-item.component";
import Button from "../../forms/button/button.component";
import ContentArticle from "../../layouts/content-article/content-article.component";
import EmptyRow from "../../layouts/empty-row/empty-row.component";
import List, { ListItem } from "../../layouts/list/list.component";
import Topbar from "../../layouts/top-bar/top-bar.component";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";
import styles from "./modal-address-manage.component.module.scss";
import { IModalAddressManage } from "./modal-address-manage.interface";

const ModalAddressManage = forwardRef((props: IModalAddressManage.Props, ref: ForwardedRef<IModalAddressManage.RefObject>) => {
  const [modalState, setModalState] = useState<IModalAddressManage.ModalState>(props.__modalState ?? '');

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {

  }, []);

  const hide = useCallback(() => {

  }, []);

  useEffect(() => {
    setModalState(props.__modalState ?? '');
  }, [props.__modalState]);

  return (
    <>
      {
        modalState === 'show' ?
        <WindowSizeContainer __bgColor="#ffffff">
          <Topbar
            __layoutTypeA={{
              titleComponent: <>주소록</>
            }} />
          <ContentArticle __bgOpacityZero={true}>
            <Button __buttonStyle="black-solid-radius">
              + 새 주소 추가하기
            </Button>
            <EmptyRow __style={{ height: '16px' }} />

            <AddressRowItem __addressItemState="default" />
            <AddressRowItem __isNoneBorderBottom={true}  />

          </ContentArticle>
        </WindowSizeContainer>
        : <></>
      }
    </>
  );
});
ModalAddressManage.displayName = 'ModalAddressManage';

export default ModalAddressManage;
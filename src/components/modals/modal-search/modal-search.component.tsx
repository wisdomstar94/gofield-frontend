import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import Modal from '../../forms/modal/modal.component';
import { IModal } from '../../forms/modal/modal.interface';
import Topbar from '../../layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../../layouts/window-size-container/window-size-container.component';
import styles from './modal-search.component.module.scss';
import { IModalSearch } from "./modal-search.interface";

const ModalSearch = forwardRef((props: IModalSearch.Props, ref: ForwardedRef<IModalSearch.RefObject>) => {
  const modalRef = useRef<IModal.RefObject>(null);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getModal() {
      return modalRef.current;
    },
  }));

  const backButtonClick = useCallback(() => {
    modalRef.current?.hide();
  }, []);

  return (
    <>
      <Modal ref={modalRef} __modalState={props.__modalState ?? ''}>
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __layoutTypeC={{}}
            __backButtonClickCallback={backButtonClick} />
          <div className={styles['search-result-box']}>
            <ul className={styles['search-result-list']}>
              <li className={styles['item']}>
                검색결과1
              </li>
            </ul>
          </div>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalSearch.displayName = 'ModalSearch';

export default ModalSearch;
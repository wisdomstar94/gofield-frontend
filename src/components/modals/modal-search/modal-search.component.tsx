import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import HashTagItem from '../../boxes/hash-tag-item/hash-tag-item.component';
import Modal from '../../forms/modal/modal.component';
import { IModal } from '../../forms/modal/modal.interface';
import Article from '../../layouts/article/article.component';
import List, { ListItem } from '../../layouts/list/list.component';
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

  const searchValueChange = useCallback((searchValue: string) => {
    console.log('@@@ searchValue', searchValue);
  }, []);

  return (
    <>
      <Modal ref={modalRef} __modalState={props.__modalState ?? ''}>
        {/* <Topbar
          __layoutTypeC={{}}
          __backButtonClickCallback={backButtonClick} /> */}
        <WindowSizeContainer __bgColor="#fff">
          <Topbar
            __layoutTypeC={{}}
            __backButtonClickCallback={backButtonClick}
            __onSearchValueChange={searchValueChange} />
          <div className={styles['search-result-box']}>
            <Article __style={{ paddingBottom: '12px' }}>
              <div className={styles['title-row']}>
                최근 검색어
              </div>
              <div className={styles['hash-tag-row']}>
                <HashTagItem>골프장갑</HashTagItem>
                <HashTagItem>골프장갑</HashTagItem>
                <HashTagItem>골프장갑</HashTagItem>
              </div>
            </Article>
            <Article>
              <div className={styles['title-row']}>
                인기 검색어
              </div>
              <div className={styles['hash-tag-row']}>
                <HashTagItem>골프장갑</HashTagItem>
                <HashTagItem>골프장갑</HashTagItem>
                <HashTagItem>골프장갑</HashTagItem>
              </div>
            </Article>
            {/* <ul className={styles['search-result-list']}>
              <li className={styles['item']}>
                검색결과1
              </li>
            </ul> */}
          </div>
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalSearch.displayName = 'ModalSearch';

export default ModalSearch;
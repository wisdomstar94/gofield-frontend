import { useRouter } from 'next/router';
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import HashTagItem from '../../boxes/hash-tag-item/hash-tag-item.component';
import Modal from '../../forms/modal/modal.component';
import { IModal } from '../../forms/modal/modal.interface';
import Article from '../../layouts/article/article.component';
import List, { ListItem } from '../../layouts/list/list.component';
import Topbar from '../../layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../../layouts/window-size-container/window-size-container.component';
import SvgBackIcon from '../../svgs/svg-back-icon/svg-back-icon.component';
import SvgMagnifyingGlassIcon from '../../svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component';
import styles from './modal-search.component.module.scss';
import { IModalSearch } from "./modal-search.interface";

const ModalSearch = forwardRef((props: IModalSearch.Props, ref: ForwardedRef<IModalSearch.RefObject>) => {
  const router = useRouter();
  const modalRef = useRef<IModal.RefObject>(null);
  const [searchValue, setSearchValue] = useState(props.__searchValue ?? '');

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getModal() {
      return modalRef.current;
    },
  }));

  useEffect(() => {
    setSearchValue(props.__searchValue ?? '');
  }, [props.__searchValue]);

  const backButtonClick = useCallback(() => {
    if (typeof props.__backButtonClick === 'function') {
      props.__backButtonClick();
      return;
    }

    history.back();
    // modalRef.current?.hide();
  }, [props]);

  const searchValueInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  }, []);

  const searchButtonClick = useCallback(() => {
    router.push('/productGroups?searchValue=' + searchValue);
  }, [router, searchValue]);

  return (
    <>
      <Modal ref={modalRef} __modalState={props.__modalState ?? ''}>
        <WindowSizeContainer __bgColor="#fff">
          <div className={styles['top-bar-row']}>
            <div className={styles['left-area']}>
              <button className={styles['back-button']} onClick={backButtonClick}>
                <SvgBackIcon />
              </button>
            </div>
            <div className={styles['center-area']}>
              <input className={styles['search-input']} placeholder="검색어를 입력하세요." type="text" value={searchValue} onChange={searchValueInputChange} />
            </div>
            <div className={styles['right-area']}>
              <div className={styles['button-item']} onClick={searchButtonClick}>
                <SvgMagnifyingGlassIcon />
              </div>
            </div>
          </div>
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
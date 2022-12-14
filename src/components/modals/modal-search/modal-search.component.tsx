import { useRouter } from 'next/router';
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useSearchRecommendKeywordListApi from '../../../hooks/use-apis/use-search-recommend-keyword-list.api';
import useRecentKeywordListQuery from '../../../hooks/use-queries/use-recent-keyword-list.query';
import useSearchRecommendKeywordListQuery from '../../../hooks/use-queries/use-search-recommend-keyword-list.query';
import useRecentKeyword from '../../../hooks/use-recent-keyword/use-recent-keyword.hook';
import useUser from '../../../hooks/use-user-hook/use-user.hook';
import { ISearch } from '../../../interfaces/search/search.interface';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import HashTagItem from '../../boxes/hash-tag-item/hash-tag-item.component';
import Modal from '../../forms/modal/modal.component';
import { IModal } from '../../forms/modal/modal.interface';
import Article from '../../layouts/article/article.component';
import BottomMenuBar from '../../layouts/bottom-menu-bar/bottom-menu-bar.component';
import List, { ListItem } from '../../layouts/list/list.component';
import Topbar from '../../layouts/top-bar/top-bar.component';
import WindowSizeContainer from '../../layouts/window-size-container/window-size-container.component';
import SvgBackIcon from '../../svgs/svg-back-icon/svg-back-icon.component';
import SvgMagnifyingGlassIcon from '../../svgs/svg-magnifying-glass-icon/svg-magnifying-glass-icon.component';
import styles from './modal-search.component.module.scss';
import { IModalSearch } from "./modal-search.interface";

const ModalSearch = forwardRef((props: IModalSearch.Props, ref: ForwardedRef<IModalSearch.RefObject>) => {
  const router = useRouter();
  const user = useUser();
  const recentKeyword = useRecentKeyword();
  const recentKeywordListQuery = useRecentKeywordListQuery();
  const modalRef = useRef<IModal.RefObject>(null);
  const [searchValue, setSearchValue] = useState(props.__searchValue ?? '');
  
  const searchRecommendKeywordListQuery = useSearchRecommendKeywordListQuery();

  useImperativeHandle(ref, () => ({
    // ?????? ?????????????????? ????????? ????????? ??????
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
    if (!user.isLogined()) {
      recentKeyword.addKeyword(searchValue);
    }
    router.push('/products?page=1&size=20&keyword=' + searchValue);
  }, [recentKeyword, router, searchValue, user]);

  const hashTagItemClick = useCallback((item: ISearch.KeywordItem) => {
    router.push('/products?page=1&size=20&keyword=' + item.keyword);
  }, [router]);

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
              <input className={styles['search-input']} placeholder="???????????? ???????????????." type="text" value={searchValue} onChange={searchValueInputChange} />
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
                ?????? ?????????
              </div>
              <div className={styles['hash-tag-row']}>
                {
                  recentKeywordListQuery.data?.length === 0 ?
                  <>
                    <span className="text-xs text-gray-b">?????? ???????????? ????????????.</span>
                  </> : 
                  recentKeywordListQuery.data?.map((item, index) => {
                    return <HashTagItem key={item.id} __onClick={() => hashTagItemClick(item)}>{ item.keyword }</HashTagItem>
                  })
                }
              </div>
            </Article>
            <Article>
              <div className={styles['title-row']}>
                ?????? ?????????
              </div>
              <div className={styles['hash-tag-row']}>
                {
                  searchRecommendKeywordListQuery.data?.map((item) => {
                    return <HashTagItem key={item.id} __onClick={() => hashTagItemClick(item)}>{ item.keyword }</HashTagItem>
                  })
                }
              </div>
            </Article>
            {/* <ul className={styles['search-result-list']}>
              <li className={styles['item']}>
                ????????????1
              </li>
            </ul> */}
          </div>
          <BottomMenuBar />
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
ModalSearch.displayName = 'ModalSearch';

export default ModalSearch;
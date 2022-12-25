import styles from "./pagination-box.component.module.scss";
import { IPaginationBox } from "./pagination-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import usePagination from "../../../hooks/use-pagination/use-pagination.hook";
import { IPage } from "../../../interfaces/page/page.interface";

const PaginationBox = forwardRef((props: IPaginationBox.Props, ref: ForwardedRef<IPaginationBox.RefObject>) => {
  const pagination = usePagination();
  const [pageInfo, setPageInfo] = useState(props.__page);
  const [paginationInfo, setPaginationInfo] = useState<IPage.PaginationInfo>();

  useEffect(() => {
    if (pageInfo === undefined) {
      return;
    }

    setPaginationInfo(pagination.getPaginationInfo(pageInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    setPage,
  }));

  const setPage = useCallback((page: IPage.Page) => {
    setPageInfo(page);
  }, []);

  const onPageClick = useCallback((page: number) => {
    if (typeof props.__onPageClick === 'function') {
      props.__onPageClick(page);
    }
  }, [props]);

  return (
    <>
      <div className={styles['pagination-box']}>
        <ul className={styles['pagination-item-list']}>
          {
            paginationInfo?.isPrev ? 
            <>
              <li 
                className={getClasses([
                  styles['item'],
                ])}
                onClick={e => onPageClick(paginationInfo.bestPrevPageNumber)}>
                {'<<'}
              </li>
              <li 
                className={getClasses([
                  styles['item'],
                ])}
                onClick={e => onPageClick(paginationInfo.prevPageNumber)}>
                {'<'}
              </li>
            </> : 
            <></>
          }

          {
            paginationInfo?.pageItems.map((item) => {
              return (
                <li 
                  key={item.page}
                  className={getClasses([
                    styles['item'],
                    item.isActive ? styles['active'] : '',
                  ])}
                  onClick={e => onPageClick(item.page)}>
                  { item.page }
                </li>
              );
            })
          }

          {
            paginationInfo?.isNext ? 
            <>
              <li 
                className={getClasses([
                  styles['item'],
                ])}
                onClick={e => onPageClick(paginationInfo.nextPageNumber)}>
                {'>'}
              </li>
              <li 
                className={getClasses([
                  styles['item'],
                ])}
                onClick={e => onPageClick(paginationInfo.bestNextPageNumber)}>
                {'>>'}
              </li>
            </> : 
            <></>
          }
          
        </ul>
      </div>
    </>
  );
});
PaginationBox.displayName = 'PaginationBox';

export default PaginationBox;
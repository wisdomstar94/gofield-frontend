import styles from "./notice-row-item.component.module.scss";
import { INoticeRowItem } from "./notice-row-item.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import SvgArrowBottomIcon from "../../svgs/svg-arrow-bottom-icon/svg-arrow-bottom-icon.component";
import useEnumNoticeTypeListQuery from "../../../hooks/use-queries/use-enum-notice-type-list.query";
import { day } from "../../../librarys/date-util/date-util.library";

const NoticeRowItem = forwardRef((props: INoticeRowItem.Props, ref: ForwardedRef<INoticeRowItem.RefObject>) => {
  const enumNoticeTypeListQuery = useEnumNoticeTypeListQuery();

  const [item, setItem] = useState(props.__item);
  useEffect(() => { setItem(props.__item) }, [props.__item]);

  const [state, setState] = useState(props.__state ?? 'default');
  useEffect(() => { setState(props.__state ?? 'default') }, [props.__state]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  const buttonRowClick = useCallback(() => {
    if (state === 'default') {
      setState('open');
    } else if (state === 'open') {
      setState('close');
    } else {
      setState('open');
    }
  }, [state]);

  return (
    <>
      <div className={getClasses([
        'block border-solid border-b border-slate-200',
        styles['container'],
        styles[state],
      ])}>
        <div data-name="button-row" className="w-full grid grid-cols-8 py-3 cursor-pointer hover:bg-slate-50" onClick={buttonRowClick}>
          <div data-name="left-area" className="col-span-7">
            <div className="block ml-4">
              <span className="text-sm">{ item?.title }</span>
            </div>
            <div className="block ml-4">
              <span className="text-xs">{ day(new Date(item?.createDate ?? '')).format('YYYY-MM-DD') }</span>
            </div>
          </div>
          <div data-name="right-area" className="flex flex-wrap justify-end items-center">
            <div className="mr-4">
              <SvgArrowBottomIcon />
            </div>
          </div>
        </div>
        <div className={getClasses([
          'w-full block bg-neutral-100 overflow-hidden',
          styles['content-row'],
        ])}>
          <div className="block h-4"></div>
          <div data-name="content-scroll-area" className="block text-xs whitespace-pre-line break-all mx-4 overflow-y-scroll">
            { item?.description?.trim() }
          </div>
          <div className="block h-4"></div>
        </div>
      </div>
    </>
  );
});
NoticeRowItem.displayName = 'NoticeRowItem';

export default NoticeRowItem;
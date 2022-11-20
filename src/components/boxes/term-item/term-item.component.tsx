import styles from "./term-item.component.module.scss";
import { ITermItem } from "./term-item.interface";
import React, { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import SvgCheckIcon from "../../svgs/svg-check-icon/svg-check-icon.component";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import SvgArrowRightIcon from "../../svgs/svg-arrow-right-icon/svg-arrow-right-icon.component";
import Modal from "../../forms/modal/modal.component";
import { IModal } from "../../forms/modal/modal.interface";
import WindowSizeContainer from "../../layouts/window-size-container/window-size-container.component";
import Topbar from "../../layouts/top-bar/top-bar.component";

const TermItem = forwardRef((props: ITermItem.Props, ref: ForwardedRef<ITermItem.RefObject>) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(props.__isChecked);
  const [termName, setTermName] = useState<React.ReactNode | undefined>(props.__termName);
  const [isOpened, setIsOpened] = useState<boolean | undefined>(props.__isOpened);
  const [childTermItems, setChildTermItems] = useState<ITermItem.ChildTermItem[] | undefined>(props.__childTermItems);
  const [modalTermContentComponent, setModalTermContentComponent] = useState<React.ReactNode | undefined>(props.__detailContentComponent);
  const termContentDetailModalRef = useRef<IModal.RefObject>(null);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getInfo,
  }));

  const getInfo = useCallback(() => {
    return {} as any;
  }, []);

  useEffect(() => {
    setIsChecked(props.__isChecked);
  }, [props.__isChecked]);

  useEffect(() => {
    setTermName(props.__termName);
  }, [props.__termName]);

  useEffect(() => {
    setIsOpened(props.__isOpened);
  }, [props.__isOpened]);

  useEffect(() => {
    setChildTermItems(props.__childTermItems);
  }, [props.__childTermItems]);

  useEffect(() => {
    setModalTermContentComponent(props.__detailContentComponent);
  }, [props.__detailContentComponent]);

  const mainRowClick = useCallback(() => {
    const nextValue = !isChecked;
    setIsChecked(nextValue);
  }, [isChecked]);

  const mainRowDetailViewButtonClick = useCallback(() => {
    if (childTermItems === undefined) {
      setModalTermContentComponent(props.__detailContentComponent);
      termContentDetailModalRef.current?.show();
      return;
    }

    setIsOpened(!isOpened);
  }, [childTermItems, isOpened, props.__detailContentComponent]);

  const childTermItemClick = useCallback((item: ITermItem.ChildTermItem) => {
    const newChildTermItem = childTermItems === undefined ? [] : [ ...childTermItems ];
    for (const newItem of newChildTermItem) {
      if (newItem === item) {
        newItem.isChecked = !newItem.isChecked;
      }
    }
    setChildTermItems(newChildTermItem);
  }, [childTermItems]);

  const childTermDetailViewButtonClick = useCallback((item: ITermItem.ChildTermItem) => {
    setModalTermContentComponent(item.detailContentComponent);
    termContentDetailModalRef.current?.show();
  }, []);

  return (
    <>
      <div className={getClasses([styles['container'], isOpened === true ? styles['open'] : styles['close']])}>
        <div className={styles['main-row']}>
          <div className={styles['checkbox-icon-area']} onClick={mainRowClick}>
            <SvgCheckIcon __isActive={isChecked === true} />
          </div>
          <div className={styles['name-area']} onClick={mainRowClick}>
            { termName }
          </div>
          <div className={styles['arrow-area']} onClick={mainRowDetailViewButtonClick}>
            <SvgArrowRightIcon />
          </div>
        </div>
        {
          childTermItems !== undefined ?
          <ul className={styles['child-term-list']}>
            <li className={styles['item']}></li>
            {
              childTermItems.map((item, index) => {
                return (
                  <li key={index} className={styles['item']} onClick={e => childTermItemClick(item)}>
                    <div className={styles['left-area']}>
                      {
                        item.isCheckBoxShow === true ?
                        <div className={styles['check-icon-area']}>
                          <SvgCheckIcon __isActive={item.isChecked === true} />
                        </div>
                        : <></>
                      } 
                      <div className={styles['term-name-area']}>
                        { item.termName }
                      </div>
                    </div>
                    <div className={styles['right-area']}>
                      <span className={styles['detail-view-button']} onClick={e => childTermDetailViewButtonClick(item)}>내용 보기</span>
                    </div>
                  </li>
                );
              })
            }
          </ul> : 
          <></>
        }
      </div>
      <Modal ref={termContentDetailModalRef}>
        <WindowSizeContainer __bgColor="#ffffff">
          <Topbar 
            __layoutTypeB={{ titleComponent: <>약관 상세보기</>, rightComponent: <></> }}
            __backButtonClickCallback={() => termContentDetailModalRef.current?.hide()} />
          { modalTermContentComponent }
        </WindowSizeContainer>
      </Modal>
    </>
  );
});
TermItem.displayName = 'TermItem';

export default TermItem;
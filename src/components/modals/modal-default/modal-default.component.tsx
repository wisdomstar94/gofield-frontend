import { AnimationEvent, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styles from './modal-default.component.module.scss';
import { IModalDefault } from "./modal-default.interface";
import { v4 } from 'uuid';

const ModalDefault = forwardRef((props: IModalDefault.Props, ref: ForwardedRef<IModalDefault.RefObject>) => {
  const [modalItems, setModalItems] = useState<IModalDefault.ModalItem[]>([]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback((modalItem: IModalDefault.ModalItem) => {
    if (typeof modalItem.uuid === 'string') {
      if (modalItems.find(x => x.uuid === modalItem.uuid) !== undefined) {
        return;
      }
    } 

    const copyModalItem = { ...modalItem };
    if (typeof copyModalItem.uuid !== 'string') {
      copyModalItem.uuid = v4();
    }

    const newModalItems = [ ...modalItems ];
    copyModalItem.modalState = 'show';
    newModalItems.push(copyModalItem);
    setModalItems(newModalItems);
  }, [modalItems]);

  const hide = useCallback((modalItem: IModalDefault.ModalItem) => {
    modalItem.modalState = 'hide';
    setModalItems([ ...modalItems ]);
  }, [modalItems]);

  const modalItemBackgroundClick = useCallback((modalItem: IModalDefault.ModalItem) => {
    modalItem.modalState = 'hide';
    setModalItems([ ...modalItems ]);
  }, [modalItems]);

  const modalItemContainerAnimationEnd = useCallback((event: AnimationEvent<HTMLDivElement>, modalItem: IModalDefault.ModalItem) => {
    // console.log('event', event);
    if (event.animationName.includes('modalItemContainerHide')) {
      // 배열에서 제거 진행...
      const newModalItems = modalItems.filter(x => x !== modalItem);
      setModalItems(newModalItems);
    }
  }, [modalItems]);

  const getTotalButtonCount = useCallback((modalItem: IModalDefault.ModalItem) => {
    let count = 0;
    if (modalItem.negativeButtonState === 'show') { count++; }
    if (modalItem.positiveButtonState === 'show') { count++; }
    return count;
  }, []);

  const modalItemNegativeButtonClick = useCallback((modalItem: IModalDefault.ModalItem) => {
    if (typeof modalItem.onNegativeButtonClick === 'function') {
      modalItem.onNegativeButtonClick(hide, modalItem);
      return;
    }

    hide(modalItem);
  }, [hide]);

  const modalItemPositiveButtonClick = useCallback((modalItem: IModalDefault.ModalItem) => {
    if (typeof modalItem.onPositiveButtonClick === 'function') {
      modalItem.onPositiveButtonClick(hide, modalItem);
      return;
    }

    hide(modalItem);
  }, [hide]);

  return (
    <>
      {
        modalItems.map((modalItem, index) => {
          return (
            <div 
              key={index}
              className={[
                styles['modal-item-container'],
                styles[modalItem.modalState ?? ''] ?? '',
              ].join(' ')}
              onAnimationEnd={(event) => { modalItemContainerAnimationEnd(event, modalItem) }}>
              <div 
                className={[
                  styles['background']
                ].join(' ')}
                onClick={e => modalItemBackgroundClick(modalItem)}>

              </div>
              <div 
                className={[
                  styles['modal-container'],
                ].join(' ')}>
                <div 
                  className={[
                    styles['modal']
                  ].join(' ')}>
                  <div className={[
                      styles['top-area'],
                    ].join(' ')}>
                    {
                      modalItem.titleStyleA?.component !== undefined ?
                      <div className={[
                          styles['title-row'], styles['title-style-a']
                        ].join(' ')}>
                        { modalItem.titleStyleA?.component }
                      </div>
                      :
                      ''
                    }
                    {
                      modalItem.titleStyleB?.component !== undefined ?
                      <div className={[
                          styles['title-row'], styles['title-style-b']
                        ].join(' ')}>
                        { modalItem.titleStyleB?.component }
                      </div>
                      :
                      ''
                    }
                    <div className={[
                        styles['content-row']
                      ].join(' ')}>
                      { modalItem.contentComponent }
                    </div>
                  </div>
                  <div className={[
                      styles['bottom-area'],
                    ].join(' ')}>
                    {
                      modalItem.negativeButtonState === 'show' ? 
                      <button 
                        className={[
                          styles['modal-button'], styles['total-count-' + getTotalButtonCount(modalItem)], styles['negative-button']
                        ].join(' ')} onClick={e => modalItemNegativeButtonClick(modalItem)}>
                        { modalItem.negativeButtonText ?? '취소' }
                      </button>
                      : ''
                    }

                    {
                      modalItem.positiveButtonState === 'show' ?
                      <button 
                        className={[
                          styles['modal-button'], styles['total-count-' + getTotalButtonCount(modalItem)], styles['positive-button']
                        ].join(' ')} onClick={e => modalItemPositiveButtonClick(modalItem)}>
                        { modalItem.positiveButtonText ?? '확인' }
                      </button>
                      : ''
                    }  
                  </div>
                </div>
              </div>
            </div>
          ); 
        })
      }
      
    </>
  );
});
ModalDefault.displayName = 'ModalDefault';

export default ModalDefault;
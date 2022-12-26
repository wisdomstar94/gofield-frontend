import styles from "./small-image-form-box.component.module.scss";
import { ISmallImageFormBox } from "./small-image-form-box.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import HorizontalScrollBox from "../../layouts/horizontal-scroll-box/horizontal-scroll-box.component";
import Image from "next/image";
import { IFile } from "../../../interfaces/file/file.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import InputFileHidden from "../input-file-hidden/input-file-hidden.component";
import { IInputFileHidden } from "../input-file-hidden/input-file-hidden.interface";
import useModalConfirm from "../../../hooks/use-modals/use-modal-confirm.modal";
import useModalAlert from "../../../hooks/use-modals/use-modal-alert.modal";

const SmallImageFormBox = forwardRef((props: ISmallImageFormBox.Props, ref: ForwardedRef<ISmallImageFormBox.RefObject>) => {
  const inputFileHiddenRef = useRef<IInputFileHidden.RefObject>(null);
  
  const [imageItems, setImageItems] = useState(props.__imageItems);
  useEffect(() => { setImageItems(props.__imageItems) }, [props.__imageItems]);

  const [isEditable, setIsEditable] = useState(props.__isEditable);
  useEffect(() => { setIsEditable(props.__isEditable) }, [props.__isEditable]);

  const modalConfirm = useModalConfirm();
  const modalAlert = useModalAlert();

  useEffect(() => {
    if (typeof props.__onChange === 'function') {
      props.__onChange(imageItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageItems]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    getImageItems,
  }));

  const getImageItems = useCallback(() => {
    return imageItems;
  }, [imageItems]);

  const imageAddButtonClick = useCallback(() => {
    if (imageItems === undefined) {
      return;
    }

    if (imageItems.length >= 10) {
      modalAlert.show({ title: '안내', content: '이미지는 최대 10개까지만 등록 가능합니다.' });
      return;
    }

    inputFileHiddenRef.current?.click();
  }, [imageItems, modalAlert]);

  const imageDeleteButtonClick = useCallback((fileInfo: IFile.FileInfo) => {
    modalConfirm.show({
      title: '안내',
      content: '해당 이미지를 삭제하시겠습니까?',
      positiveCallback(hide, modalItem) {
        setImageItems((prev) => {
          return prev?.filter(x => x !== fileInfo);
        });
        hide(modalItem);
      },
    })
  }, [modalConfirm]);

  const onFileChange = useCallback((fileInfo: IFile.FileInfo) => {
    setImageItems((prev) => {
      const newValue = prev !== undefined ? [ ...prev ] : [];
      newValue.unshift(fileInfo);
      return newValue;
    });
  }, []);

  return (
    <>
      <div className={styles['small-image-form-box']}>
        <HorizontalScrollBox>
          {
            isEditable !== false ?
            <div 
              className={getClasses([
                styles['image-item'],
                styles['cursor'],
              ])}
              onClick={imageAddButtonClick}>
              <div className={styles['image-box']}>
                +
              </div>
            </div> : 
            <></>
          }
          {
            imageItems?.map((item, index) => {
              return (
                <div className={styles['image-item']} key={index}>
                  {
                    isEditable !== false ? 
                    <div className={styles['delete-button']} onClick={e => imageDeleteButtonClick(item)}>
                      x
                    </div> : 
                    <></>
                  } 
                  <div className={styles['image-box']}>
                    <Image
                      src={item.fileUrl ?? ''}
                      alt="로고 이미지"
                      title="로고 이미지"
                      layout="fill"
                      objectFit="cover" />
                  </div>
                </div>
              )
            })
          }
        </HorizontalScrollBox>
      </div>
      <InputFileHidden
        ref={inputFileHiddenRef}
        __onChange={onFileChange} />
    </>
  );
});
SmallImageFormBox.displayName = 'SmallImageFormBox';

export default SmallImageFormBox;
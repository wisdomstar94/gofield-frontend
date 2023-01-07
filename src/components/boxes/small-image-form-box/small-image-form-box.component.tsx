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
import { useRecoilState } from "recoil";
import { globalModalSwiperAtom } from "../../../atoms/global-modal-swiper.atom";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";
import ImageBox from "../image-box/image-box.component";

const SmallImageFormBox = forwardRef((props: ISmallImageFormBox.Props, ref: ForwardedRef<ISmallImageFormBox.RefObject>) => {
  const inputFileHiddenRef = useRef<IInputFileHidden.RefObject>(null);
  const [globalModalSwiper, setGlobalModalSwiper] = useRecoilState(globalModalSwiperAtom);
  const imageManager = useImageManager();
  
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
    let targetImageItems = imageItems ?? [];

    if (targetImageItems.length >= 10) {
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
          const newValue = prev?.filter(x => x !== fileInfo);
          if (typeof props.__onChange === 'function') {
            props.__onChange(newValue);
          }
          return newValue;
        });
        hide(modalItem);
      },
    })
  }, [modalConfirm, props]);

  const onFileChange = useCallback((fileInfo: IFile.FileInfo) => {
    setImageItems((prev) => {
      const newValue = prev !== undefined ? [ ...prev ] : [];
      newValue.unshift(fileInfo);
      if (typeof props.__onChange === 'function') {
        props.__onChange(newValue);
      }
      return newValue;
    });
  }, [props]);

  const imageClick = useCallback((targetIndex: number) => {
    setGlobalModalSwiper({
      swiperItems: imageItems?.map((item) => ({
        reactNode: <>
          <ImageBox
            mode="pure"
            priority={true}
            src={imageManager.getImageUrl(item.fileUrl, '') ?? ''}
            alt={'이미지'}
            title={'이미지'}
            fill={true}
            sizes="100% 100%"
            draggable={false}
            style={{
              objectFit: 'contain',
            }}
            placeholder="blur"
            blurDataURL="/images/loading-files.gif"
            />
        </>,
      })) ?? [],
      activeIndex: targetIndex,
    });
  }, [imageItems, imageManager, setGlobalModalSwiper]);

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
                  <div className={styles['image-box']} onClick={e => imageClick(index)}>
                    <ImageBox
                      mode="pure"
                      src={imageManager.getImageUrl(item.fileUrl, '?s=60x60&t=crop&q=100&f=webp') ?? ''}
                      alt="이미지"
                      title="이미지"
                      fill={true}
                      // priority={true}
                      sizes="100%"
                      placeholder="blur"
                      blurDataURL="/images/loading-files.gif"
                      style={{
                        objectFit: 'cover',
                      }} />
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
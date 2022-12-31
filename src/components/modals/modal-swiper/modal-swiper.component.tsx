import styles from "./modal-swiper.component.module.scss";
import { IModalSwiper } from "./modal-swiper.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ModalV2 from "../../forms/modal-v2/modal-v2.component";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import SvgCloseIcon from "../../svgs/svg-close-icon/svg-close-icon.component";

const ModalSwiper = forwardRef((props: IModalSwiper.Props, ref: ForwardedRef<IModalSwiper.RefObject>) => {
  const [swiper, setSwiper] = useState<any>(null);

  const [modalState, setModalState] = useState(props.__modalState ?? '');
  useEffect(() => { setModalState(props.__modalState ?? '') }, [props.__modalState]);

  const activeIndexRef = useRef(0);

  const [swiperItems, setSwiperItems] = useState(props.__swiperItems);
  useEffect(() => { setSwiperItems(props.__swiperItems) }, [props.__swiperItems]);
  useEffect(() => {
    if (swiperItems?.length ?? 0 > 0) {
      swiper.slideTo(activeIndexRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperItems]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
    setSwiperInfo,
  }));
  
  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  const setSwiperInfo = useCallback((swiperItems: IModalSwiper.SwiperItem[], activeIndex?: number) => {
    const applyActiveIndex = activeIndex ?? 0;
    activeIndexRef.current = applyActiveIndex;
    setSwiperItems(swiperItems);
  }, []);

  const closeButtonClick = useCallback(() => {
    hide();
  }, [hide]);

  return (
    <>
      <ModalV2 __modalState={modalState}>
        <div className={styles['container']}>
          <div className={styles['close-button']} onClick={closeButtonClick}>
            <SvgCloseIcon __color="#fff" />
          </div>
          <div className={styles['center-content-box']}>
            <Swiper
              navigation
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => setSwiper(swiper)}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{ delay: 3000 }} 
            >
              {
                swiperItems?.map((item, index) => {
                  return (
                    <SwiperSlide 
                      key={index}>
                      <div className={styles['slide-item']}>
                        <div className={styles['inner-box']}>
                          { item.reactNode }
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              }
            </Swiper>
          </div>
        </div>
      </ModalV2>
    </>
  );
});
ModalSwiper.displayName = 'ModalSwiper';

export default ModalSwiper;
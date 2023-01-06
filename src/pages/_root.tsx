import React, { useEffect, useRef } from "react";
import { useRecoilState } from 'recoil';
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../atoms/axios.atom";
import { deviceTypeAtom } from "../atoms/device-type.atom";
import { globalModalDefaultModalItemAtom } from "../atoms/global-modal-default.atom";
import LoadingDisplayBox from "../components/boxes/loading-display-box/loading-display-box.component";
import ModalV2 from "../components/forms/modal-v2/modal-v2.component";
import ModalDefault from "../components/modals/modal-default/modal-default.component";
import { IModalDefault } from "../components/modals/modal-default/modal-default.interface";
import ModalSwiper from "../components/modals/modal-swiper/modal-swiper.component";
import { IModalSwiper } from "../components/modals/modal-swiper/modal-swiper.interface";
import { getDeviceInfo } from "../librarys/client-util/client-util.library";
import Image from 'next/image';
import { globalModalSwiperAtom } from "../atoms/global-modal-swiper.atom";
import { useRouter } from "next/router";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  const router = useRouter();
  const [axiosGloballError, setAxiosGloballError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);
  const [globalModalDefaultModalItem, setGlobalModalDefaultModalItem] = useRecoilState(globalModalDefaultModalItemAtom);
  const [globalModalSwiper, setGlobalModalSwiper] = useRecoilState(globalModalSwiperAtom);
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  const modalDefaultComponentRef = useRef<IModalDefault.RefObject>(null);
  const modalSwiperRef = useRef<IModalSwiper.RefObject>(null);

  const notShowErrorCode = useRef(new Set(['F4300']));

  useEffect(() => {
    if (axiosGloballError === null) {
      return;
    }
    
    if (axiosGloballError.response?.status === 502 || axiosGloballError.code === 'ERR_NETWORK') {
      modalDefaultComponentRef.current?.show({
        uuid: 'server-netword-error',
        titleStyleA: {
          component: '안내',
        },
        contentComponent: `서버 점검 중입니다. 잠시 후 다시 시도해 주세요.`,
        negativeButtonState: 'hide',
        positiveButtonState: 'show',
      });  
      router.push('/server/inspection');
      return;
    }

    const code = axiosGloballError.response?.data.error?.code;
    const message = axiosGloballError.response?.data.error?.message;
    
    if (notShowErrorCode.current.has(code + '')) {
      return;
    }

    modalDefaultComponentRef.current?.show({
      titleStyleA: {
        component: code,
      },
      contentComponent: message,
      negativeButtonState: 'hide',
      positiveButtonState: 'show',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosGloballError]);

  useEffect(() => {
    if (axiosGloballResponse === null) {
      return;
    }
  }, [axiosGloballResponse]);

  useEffect(() => {
    if (globalModalDefaultModalItem === null) {
      return;
    }

    modalDefaultComponentRef.current?.show(globalModalDefaultModalItem);
  }, [globalModalDefaultModalItem]);

  useEffect(() => {
    function onResize() {
      const deviceInfo = getDeviceInfo();
      // console.log('deviceInfo', deviceInfo);

      if (deviceInfo.type === undefined) {
        // pc
        setDeviceType('pc');
      } else {
        // mobile
        setDeviceType('mobile');
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
    }
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    modalSwiperRef.current?.setSwiperInfo(globalModalSwiper.swiperItems, globalModalSwiper.activeIndex);
    if (globalModalSwiper.swiperItems.length > 0) {
      modalSwiperRef.current?.show();
    }
  }, [globalModalSwiper]);

  return (
    <>
      {props.children}
      <ModalDefault
        ref={modalDefaultComponentRef} />
      <LoadingDisplayBox />
      <ModalSwiper 
        ref={modalSwiperRef} />
    </>
  );
};

export default RootComponent;

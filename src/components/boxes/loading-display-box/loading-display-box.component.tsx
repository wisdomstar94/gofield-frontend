import styles from "./loading-display-box.component.module.scss";
import { ILoadingDisplayBox } from "./loading-display-box.interface";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { IModal } from "../../forms/modal/modal.interface";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../../atoms/device-type.atom";
import { globalLoadingDataAtom } from "../../../atoms/global-loading-data.atom";
import { useRouter } from "next/router";
import useCheckDebounce from "../../../hooks/use-check-debounce/use-check-debounce.hook";

const LoadingDisplayBox = forwardRef((props: ILoadingDisplayBox.Props, ref: ForwardedRef<ILoadingDisplayBox.RefObject>) => {
  const router = useRouter();
  const [showState, setShowState] = useState<IModal.ModalState>('');
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);
  const [globalLoadingData, setGlobalLoadingData] = useRecoilState(globalLoadingDataAtom);

  const checkDebounceHide = useCheckDebounce();

  useEffect(() => {
    // console.log('@@ latest globalLoadingData', globalLoadingData);

    if (globalLoadingData.size === 0) {
      // hideSubject.next(globalLoadingData);
      checkDebounceHide.check(() => {
        if (globalLoadingData.size === 0) {
          setShowState('hide');    
        }
      }, 100);
    } else {
      setShowState('show');
      // showSubject.next(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLoadingData]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    
  }));

  return (
    <>
      <div 
        className={getClasses([
          styles['container'],
          styles[showState],
          styles[deviceType],
        ])}>
        <div className={styles['loading-display-box']}>
          <div className={styles['center-content']}>
            로딩중입니다...
          </div>
        </div>
      </div>
    </>
  );
});
LoadingDisplayBox.displayName = 'LoadingDisplayBox';

export default LoadingDisplayBox;
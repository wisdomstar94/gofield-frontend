import styles from "./modal-v2.component.module.scss";
import { IModalV2 } from "./modal-v2.interface";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../../atoms/device-type.atom";
import { getClasses } from "../../../librarys/string-util/string-util.library";

const ModalV2 = forwardRef((props: IModalV2.Props, ref: ForwardedRef<IModalV2.RefObject>) => {
  const [modalState, setModalState] = useState(props.__modalState ?? '');
  useEffect(() => { setModalState(props.__modalState ?? '') }, [props.__modalState]);

  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    show,
    hide,
  }));

  const show = useCallback(() => {
    setModalState('show');
  }, []);

  const hide = useCallback(() => {
    setModalState('hide');
  }, []);

  return (
    <>
      <div 
        className={getClasses([
          styles['container'],
          styles[modalState],
          styles[deviceType],
        ])}>
        { props.children }
      </div>
    </>
  );
});
ModalV2.displayName = 'ModalV2';

export default ModalV2;
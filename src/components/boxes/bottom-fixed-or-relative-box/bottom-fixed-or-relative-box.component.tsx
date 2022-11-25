import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./bottom-fixed-or-relative-box.component.module.scss";
import { IBottomFixedOrRelativeBox } from "./bottom-fixed-or-relative-box.interface";

const BottomFixedOrRelativeBox = (props: IBottomFixedOrRelativeBox.Props) => {
  const lastBottomElementRef = useRef<HTMLDivElement>(null);
  const [positionState, setPositionState] = useState<IBottomFixedOrRelativeBox.PositionState>('fixed');
  const [heightToRelative, setHeightToRelative] = useState<number>(props.__heightToRelative ?? 0);
  const [isFixed, setIsFixed] = useState<boolean>(true);

  useEffect(() => {
    setHeightToRelative(props.__heightToRelative ?? 0);
  }, [props.__heightToRelative]);

  useEffect(() => {
    setPositionState(isFixed ? 'fixed' : 'relative');
  }, [isFixed]);

  const windowSizeCheck = useCallback(() => {
    if (typeof window === undefined) {
      return;
    }

    if (lastBottomElementRef.current === null) {
      return;
    }

    const windowHeight = window.innerHeight;
    if (windowHeight - heightToRelative < lastBottomElementRef.current?.getBoundingClientRect().top) {
      setIsFixed(false);
    } else {
      setIsFixed(true);
    }
  }, [heightToRelative]);

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.removeEventListener('resize', windowSizeCheck);
    window.addEventListener('resize', windowSizeCheck);
    windowSizeCheck();

    return () => {
      window.removeEventListener('resize', windowSizeCheck);
    };
  }, [windowSizeCheck]);

  useEffect(() => {
    windowSizeCheck();
  });

  return (
    <>
      <div className="relative" ref={lastBottomElementRef}></div>
      <div className={styles['container']} style={{ position: positionState }}>
        { props.children }
      </div>
    </>
  );
};

export default BottomFixedOrRelativeBox;
import { useCallback, useEffect, useState } from "react";
import styles from "./bottom-fixed-or-relative-box.component.module.scss";
import { IBottomFixedOrRelativeBox } from "./bottom-fixed-or-relative-box.interface";

const BottomFixedOrRelativeBox = (props: IBottomFixedOrRelativeBox.Props) => {
  const [positionState, setPositionState] = useState<IBottomFixedOrRelativeBox.PositionState>('fixed');
  const [heightToRelative, setHeightToRelative] = useState<number | undefined>();
  const [isFixed, setIsFixed] = useState<boolean | undefined>(props.__isFixed);

  useEffect(() => {
    setHeightToRelative(props.__heightToRelative);
  }, [props.__heightToRelative]);

  useEffect(() => {
    setIsFixed(props.__isFixed);
  }, [props.__isFixed]);

  useEffect(() => {
    setPositionState(isFixed ? 'fixed' : 'relative');
  }, [isFixed]);

  const checkWindowSize = useCallback(() => {
    if (isFixed !== undefined) {
      setPositionState(isFixed ? 'fixed' : 'relative');
      return;
    }

    if (heightToRelative === undefined) {
      return;
    }

    if (heightToRelative > window.innerHeight) {
      setPositionState('relative');
    } else {
      setPositionState('fixed');
    }
  }, [heightToRelative, isFixed]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkWindowSize);
      window.addEventListener('resize', checkWindowSize);
      checkWindowSize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkWindowSize);
      }
    };
  }, [checkWindowSize]);

  return (
    <>
      <div className={styles['container']} style={{ position: positionState }}>
        { props.children }
      </div>
    </>
  );
};

export default BottomFixedOrRelativeBox;
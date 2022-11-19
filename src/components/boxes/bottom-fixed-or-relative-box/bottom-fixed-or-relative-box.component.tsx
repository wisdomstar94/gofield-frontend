import { useCallback, useEffect, useState } from "react";
import styles from "./bottom-fixed-or-relative-box.component.module.scss";
import { IBottomFixedOrRelativeBox } from "./bottom-fixed-or-relative-box.interface";

const BottomFixedOrRelativeBox = (props: IBottomFixedOrRelativeBox.Props) => {
  const [positionState, setPositionState] = useState<IBottomFixedOrRelativeBox.PositionState>('fixed');
  const [heightToRelative, setHeightToRelative] = useState<number | undefined>();

  useEffect(() => {
    setHeightToRelative(props.__heightToRelative);
  }, [props.__heightToRelative]);

  const checkWindowSize = useCallback(() => {
    if (heightToRelative === undefined) {
      return;
    }

    if (heightToRelative > window.innerHeight) {
      setPositionState('relative');
    } else {
      setPositionState('fixed');
    }
  }, [heightToRelative]);

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
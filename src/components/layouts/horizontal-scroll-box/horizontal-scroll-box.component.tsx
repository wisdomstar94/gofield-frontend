import { IHorizontalScrollBox } from "./horizontal-scroll-box.interface";
import styles from './horizontal-scroll-box.component.module.scss';
import { useEffect, useRef } from "react";

const HorizontalScrollBox = (props: IHorizontalScrollBox.Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof props.__scrollLeft !== 'number' || containerRef.current === null) {
      return;
    }

    containerRef.current.scrollLeft = props.__scrollLeft;
  }, [props.__scrollLeft]);

  return (
    <>
      <div ref={containerRef} className={styles['container']} style={props.__style}>
        <div className={styles['inline-box']}>
          { props.children }
        </div>
      </div>
    </>
  );
};

export default HorizontalScrollBox;
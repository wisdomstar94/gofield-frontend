import { useRef } from 'react';
import { useScrollCheck } from '../../../hooks/use-scroll-check/use-scroll-check.hook';
import styles from './window-size-container.component.module.scss';
import { IWindowSizeContainer } from './window-size-container.interface';

const WindowSizeContainer = (props: IWindowSizeContainer.Props) => {
  const divElementRef = useRef<HTMLDivElement>(null);

  useScrollCheck({
    targetElementRef: divElementRef,
    appIsChildApply: false,
    appScrollCheckTarget: 'self',
    onScrolled: (info) => {
      if (typeof props.__onScroll === 'function') {
        props.__onScroll(info);
      }
    },
  });

  return (
    <>
      <div 
        ref={divElementRef}
        className={styles['window-size-container']}
        style={{
          backgroundColor: props.__bgColor,
          padding: props.__padding,
          zIndex: props.__zIndex,
        }}>
        { props.children }
      </div>
    </>
  );
};

export default WindowSizeContainer;
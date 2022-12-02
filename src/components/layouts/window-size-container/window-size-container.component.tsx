import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { deviceTypeAtom } from '../../../atoms/device-type.atom';
import { useScrollCheck } from '../../../hooks/use-scroll-check/use-scroll-check.hook';
import { getDeviceInfo } from '../../../librarys/client-util/client-util.library';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import styles from './window-size-container.component.module.scss';
import { IWindowSizeContainer } from './window-size-container.interface';

const WindowSizeContainer = (props: IWindowSizeContainer.Props) => {
  const divElementRef = useRef<HTMLDivElement>(null);
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

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
        className={getClasses([
          styles['window-size-container'],
          styles[deviceType],
        ])}
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
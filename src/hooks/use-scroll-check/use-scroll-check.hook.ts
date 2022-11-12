import { useEffect, useRef } from "react";
import useAddEventListener from "../use-add-event-listener/use-add-event-listener.hook";
import { IScrollCheckHook } from "./use-scroll-check.interface";

export const useScrollCheck = (props: IScrollCheckHook.Props) => {
  const targetElementRef = useRef(null as any);
  useEffect(() => {
    targetElementRef.current = props.targetElementRef.current;
    if (props.appScrollCheckTarget === 'window') {
      if (typeof window !== 'undefined') {
        targetElementRef.current = window;
      }
    }

    if (props.appIsChildApply === true) {
      targetElementRef.current = targetElementRef.current.firstChild;
    }
  }, [props.appIsChildApply, props.appScrollCheckTarget, props.targetElementRef]);

  const onScrolledCallback = useRef(null as any);
  useEffect(() => {
    onScrolledCallback.current = props.onScrolled;
  }, [props.onScrolled]);

  useAddEventListener(props.targetElementRef, 'scroll', (event: Event) => {
    let scrollTop = 0;
    if (props.appScrollCheckTarget === 'window') {
      scrollTop = document.querySelector('html')?.scrollTop!;
    } else {
      scrollTop = (event.target as any).scrollTop;
    }

    // console.log('event', event);

    /*
      event.target 이 document 이면 scrollHeight, clientHeight 값은 undefined 입니다.
    */
    let target: any = event.target;
    if (props.appScrollCheckTarget === 'window') {
      target = document.querySelector('html');
    }

    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    // console.log('clientHeight', clientHeight);

    let isLastScrollArea = false;
    if (scrollHeight !== undefined && clientHeight !== undefined) {
      if ((scrollHeight - clientHeight - 40) < scrollTop) {
        isLastScrollArea = true;
      }
    }

    // console.log('scrollTop', scrollTop);
    onScrolledCallback.current({
      scrollTop: scrollTop,
      scrollHeight: scrollHeight,
      clientHeight: clientHeight,
      isLastScrollArea: isLastScrollArea,
    });
  });

  useEffect(() => {

    return () => {
      // console.log('unmount...');

    };
  }, []);
};

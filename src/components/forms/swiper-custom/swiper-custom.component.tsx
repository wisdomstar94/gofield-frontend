import styles from "./swiper-custom.component.module.scss";
import { ISwiperCustom } from "./swiper-custom.interface";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { useDrag } from "../../../hooks/use-drag/use-drag.hook";
import anime from 'animejs';

const SwiperCustom = (props: ISwiperCustom.Props) => {
  const swiperCustomDivRef = useRef<HTMLDivElement>(null);
  const swipeSpeed = useRef(props.__swipeSpeed ?? 400);
  const isLoop = useRef(props.__isLoop ?? false);
  const isSwipping = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(props.__currentIndex ?? 0);
  const [activePaginationIndex, setActivePaginationIndex] = useState(props.__currentIndex ?? 0);
  const touchStartTimeRef = useRef(0);
  const touchEndTimeRef = useRef(0);

  useEffect(() => {
    setCurrentIndex(props.__currentIndex ?? 0);
    setActivePaginationIndex(props.__currentIndex ?? 0);
  }, [props.__currentIndex]);

  useEffect(() => {
    getSlideItemElements(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    swipeSpeed.current = props.__swipeSpeed ?? 400;
  }, [props.__swipeSpeed]);

  useEffect(() => {
    isLoop.current = props.__isLoop ?? false;
    if (Children.count(props.children) < 3) {
      isLoop.current = false;
    }
  }, [props.__isLoop, props.children]);

  useDrag(swiperCustomDivRef, {
    onDragStart(dragInfo) {
      touchStartTimeRef.current = new Date().getTime();
    },
    onDragging(dragInfo) {
      if (isSwipping.current) {
        return;
      }

      const slideItemElements = getSlideItemElements();
      if (slideItemElements.currentIndexElement !== null) {
        slideItemElements.currentIndexElement.style.transform = `translateX(${dragInfo.differenceX}px)`;
      }
      if (slideItemElements.prevIndexElement !== null) {
        slideItemElements.prevIndexElement.style.transform = `translateX(${dragInfo.differenceX}px)`;
      }
      if (slideItemElements.nextIndexElement !== null) {
        slideItemElements.nextIndexElement.style.transform = `translateX(${dragInfo.differenceX}px)`;
      }
    },
    onDragEnd(dragInfo) {
      if (isSwipping.current) {
        return;
      }

      touchEndTimeRef.current = new Date().getTime();

      const slideItemElements = getSlideItemElements();
      const childrenCount = Children.count(props.children);
      const prevIndex = currentIndex - 1 < 0 ? childrenCount - 1 : currentIndex - 1;
      const nextIndex = currentIndex + 1 >= childrenCount ? 0 : currentIndex + 1;
      isSwipping.current = true;

      const targets = [
        slideItemElements.currentIndexElement, 
        slideItemElements.prevIndexElement, 
        slideItemElements.nextIndexElement
      ].filter(x => x !== null);

      let isWillLeftSliding = dragInfo.isLeftBouncing || dragInfo.differenceX < -60;
      if (!isLoop.current && currentIndex === Children.count(props.children) - 1) {
        isWillLeftSliding = false;
      }

      let isWillRightSliding = dragInfo.isRightBouncing || dragInfo.differenceX > 60;
      if (!isLoop.current && currentIndex === 0) {
        isWillRightSliding = false;
      }

      let translateX = 0;
      let completeCallback = () => {
        isSwipping.current = false;
        getSlideItemElements(true);
      };
      
      if (isWillLeftSliding) {
        if (typeof props.__onChange === 'function') {
          props.__onChange(currentIndex, nextIndex);
        }
        translateX = -getSwiperBoxWidth();
        setActivePaginationIndex(nextIndex);
        completeCallback = () => {
          isSwipping.current = false;
          setCurrentIndex(nextIndex);
        };
      } else if (isWillRightSliding) {
        if (typeof props.__onChange === 'function') {
          props.__onChange(currentIndex, nextIndex);
        }
        translateX = getSwiperBoxWidth();
        setActivePaginationIndex(prevIndex);
        completeCallback = () => {
          isSwipping.current = false;
          setCurrentIndex(prevIndex);
        };
      } else {
        if (touchEndTimeRef.current - touchStartTimeRef.current < 100) {
          if (typeof props.__onItemClick === 'function') {
            props.__onItemClick(currentIndex);
          }
        }
      }

      anime({
        targets: targets,
        translateX,
        duration: swipeSpeed.current,
        easing: 'easeOutQuart',
        complete: completeCallback,
      });
    },
  });

  const getSlideItemElements = useCallback((translateReturn?: boolean) => {
    const elements = {
      currentIndexElement: swiperCustomDivRef.current?.querySelector<HTMLDivElement>('.' + styles['current-index']) ?? null,
      prevIndexElement: swiperCustomDivRef.current?.querySelector<HTMLDivElement>('.' + styles['prev-index']) ?? null,
      nextIndexElement: swiperCustomDivRef.current?.querySelector<HTMLDivElement>('.' + styles['next-index']) ?? null,
    };

    if (translateReturn === true) {
      if (elements.currentIndexElement !== null) {
        elements.currentIndexElement.style.transform = `translateX(0)`;
      }
      if (elements.prevIndexElement !== null) {
        elements.prevIndexElement.style.transform = `translateX(0)`;
      }
      if (elements.nextIndexElement !== null) {
        elements.nextIndexElement.style.transform = `translateX(0)`;
      }
    }

    return elements;
  }, []);

  const getSwiperBoxWidth = useCallback(() => {
    if (swiperCustomDivRef.current === null) {
      return 0;
    }

    return swiperCustomDivRef.current.clientWidth;
  }, []);

  const slideItemClasses = useCallback((index: number) => {
    const classes: Set<string> = new Set([styles['slide-item']]);
    const childrenCount = Children.count(props.children);
    const prevIndex = currentIndex - 1 < 0 ? childrenCount - 1 : currentIndex - 1;
    const nextIndex = currentIndex + 1 >= childrenCount ? 0 : currentIndex + 1;

    console.log('currentIndex', currentIndex);

    // 슬라이드 아이템이 1개 이거나 2개인 경우는 아래와 같이 처리
    if (childrenCount === 1) {
      classes.add(styles['current-index']);
      return Array.from(classes).join(' ');
    } else if (childrenCount === 2) {
      if (currentIndex === 0) {
        if (index === 0) {
          classes.add(styles['current-index']);
        } else if (index === 1) {
          classes.add(styles['next-index']);
        }
      } else if (currentIndex === 1) {
        if (index === 0) {
          classes.add(styles['prev-index']);
        } else if (index === 1) {
          classes.add(styles['current-index']);
        }
      }
      return Array.from(classes).join(' ');
    }
    
    // 슬라이드 아이템이 3개 이상인 경우는 아래와 같이 처리
    if (index === currentIndex) {
      classes.add(styles['current-index']);
    } else if (index === prevIndex) {
      classes.add(styles['prev-index']);
    } else if (index === nextIndex) {
      classes.add(styles['next-index']);
    } else {
      classes.add(styles['not-matched-index']);
    }

    if (!isLoop.current && index === prevIndex && currentIndex === 0) {
      classes.delete(styles['prev-index']);
      classes.add(styles['not-matched-index']);
    }

    if (!isLoop.current && index === nextIndex && currentIndex === Children.count(props.children) - 1) {
      classes.delete(styles['next-index']);
      classes.add(styles['not-matched-index']);
    }

    return Array.from(classes).join(' ');
  }, [currentIndex, props.children]);

  const paginationItemClasses = useCallback((index: number) => {
    const classes: string[] = [styles['item']];

    if (activePaginationIndex === index) {
      classes.push(styles['active']);
    }

    return classes.join(' ');
  }, [activePaginationIndex]);

  return (
    <>
      <div className={[
          styles['container']
        ].join(' ')}
        style={props.__style}>
        <div 
          ref={swiperCustomDivRef}
          className={[
            styles['swiper-custom'],
          ].join(' ')}>
          {
            Children.map(props.children, (child, index) => {
              return (
                <div key={index}
                  className={slideItemClasses(index)}>
                  { child }
                </div>
              );
            })
          }
        </div>

        <ul className={[
            styles['pagination-box']
          ].join(' ')}>
          {
            Children.map(props.children, (child, index) => {
              return (
                <>
                  <li key={index}
                    className={paginationItemClasses(index)}>

                  </li>
                </>
              );
            })
          }
        </ul>
      </div>
    </>
  );
};

export default SwiperCustom;
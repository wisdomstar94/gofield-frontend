import { useCallback, useEffect, useRef } from "react";
import { IUseDragHook } from "./use-drag.interface";

export const useDrag = (elementRef: { current: HTMLElement | null }, props: IUseDragHook.Props) => {
  const isMouseDown = useRef(false);
  const bounceDistance = useRef(7);
  const dragStartInfo = useRef<IUseDragHook.DragInfo>();

  const dragMovePrevInfo = useRef<IUseDragHook.DragInfo>();
  const dragMoveInfo = useRef<IUseDragHook.DragInfo>();

  const getXY = useCallback((event: MouseEvent | TouchEvent) => {
    let x = 0;
    let y = 0;
    if (event instanceof MouseEvent) {
      x = event.pageX;
      y = event.pageX;
    } else {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    }

    return {
      x, y
    };
  }, []);

  const dragStart = useCallback((event: MouseEvent | TouchEvent) => {
    isMouseDown.current = true;

    const position = getXY(event);
    dragStartInfo.current = {
      startX: position.x,
      startY: position.y,
      currentX: position.x,
      currentY: position.y,
      isLeftDrag: false,
      isLeftBouncing: false,
      isRightDrag: false,
      isRightBouncing: false,
      isUpDrag: false,
      isUpBouncing: false,
      isDownDrag: false,
      isDownBouncing: false,
      differenceX: 0,
      differenceY: 0,
    };
    dragMovePrevInfo.current = { ...dragStartInfo.current };

    if (typeof props.onDragStart === 'function') {
      props.onDragStart(dragStartInfo.current);
    }
  }, [getXY, props]);

  const dragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isMouseDown.current) {
      return;
    }

    const position = getXY(event);
    dragMoveInfo.current = {
      startX: dragStartInfo.current?.startX ?? 0,
      startY: dragStartInfo.current?.startY ?? 0,
      currentX: position.x,
      currentY: position.y,
      isLeftDrag: false,
      isLeftBouncing: false,
      isRightDrag: false,
      isRightBouncing: false,
      isUpDrag: false,
      isUpBouncing: false,
      isDownDrag: false,
      isDownBouncing: false,
      differenceX: 0,
      differenceY: 0,
    };

    const distanceX = dragMoveInfo.current.startX - dragMoveInfo.current.currentX;
    const distanceY = dragMoveInfo.current.startY - dragMoveInfo.current.currentY;

    dragMoveInfo.current.differenceX = -distanceX;
    dragMoveInfo.current.differenceY = -distanceY;

    dragMoveInfo.current.isLeftDrag = distanceX > 0;
    if (dragMoveInfo.current.isLeftDrag) {
      dragMoveInfo.current.isLeftBouncing = ((dragMovePrevInfo.current?.currentX ?? -1000) - dragMoveInfo.current.currentX) >= bounceDistance.current;
    }

    dragMoveInfo.current.isRightDrag = distanceX < 0;
    if (dragMoveInfo.current.isRightDrag) {
      dragMoveInfo.current.isRightBouncing = (dragMoveInfo.current.currentX - (dragMovePrevInfo.current?.currentX ?? -1000)) >= bounceDistance.current;
    }

    dragMoveInfo.current.isUpDrag = distanceY > 0;
    if (dragMoveInfo.current.isUpDrag) {
      dragMoveInfo.current.isUpBouncing = ((dragMovePrevInfo.current?.currentY ?? -1000) - dragMoveInfo.current.currentY) >= bounceDistance.current;
    }

    dragMoveInfo.current.isDownDrag = distanceY < 0;
    if (dragMoveInfo.current.isDownDrag) {
      dragMoveInfo.current.isDownBouncing = (dragMoveInfo.current.currentY - (dragMovePrevInfo.current?.currentY ?? -1000)) >= bounceDistance.current;
    }

    dragMovePrevInfo.current = { ...dragMoveInfo.current };

    if (typeof props.onDragging === 'function') {
      props.onDragging(dragMoveInfo.current);
    }
  }, [getXY, props]);

  const dragEnd = useCallback((event: MouseEvent | TouchEvent) => {
    isMouseDown.current = false;

    if (typeof props.onDragEnd === 'function' && dragMoveInfo.current !== undefined) {
      props.onDragEnd(dragMoveInfo.current);
    }
  }, [props]);

  useEffect(() => {
    if (elementRef.current === null) {
      return;
    }
    
    elementRef.current.removeEventListener('mousedown', dragStart);
    elementRef.current.removeEventListener('touchstart', dragStart);

    if (typeof document !== 'undefined') {
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('touchmove', dragMove);

      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchend', dragEnd);
    }

    elementRef.current.addEventListener('mousedown', dragStart);
    elementRef.current.addEventListener('touchstart', dragStart);

    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', dragMove);
      document.addEventListener('touchmove', dragMove);

      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('touchend', dragEnd);
    }

    return () => {
      elementRef.current?.removeEventListener('mousedown', dragStart);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      elementRef.current?.removeEventListener('touchstart', dragStart);

      if (typeof document !== 'undefined') {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('touchmove', dragMove);

        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchend', dragEnd);
      }
    };
  }, [dragEnd, dragMove, dragStart, elementRef]);
};

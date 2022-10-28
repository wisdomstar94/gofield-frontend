export declare namespace IUseDragHook {
  export type DragDirection = 'left' | 'right' | 'up' | 'down';

  export interface DragInfo {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isLeftDrag: boolean;
    isLeftBouncing: boolean;
    isRightDrag: boolean;
    isRightBouncing: boolean;
    isUpDrag: boolean;
    isUpBouncing: boolean;
    isDownDrag: boolean;
    isDownBouncing: boolean;
    differenceX: number;
    differenceY: number;
  }

  export interface Props {
    onDragStart: (dragInfo: DragInfo) => void;
    onDragging: (dragInfo: DragInfo) => void;
    onDragEnd: (dragInfo: DragInfo) => void;
  }
}
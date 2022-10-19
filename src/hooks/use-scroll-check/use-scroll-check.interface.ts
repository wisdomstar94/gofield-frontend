export declare namespace IScrollCheckHook {
  export type Target = 'window' | 'self';
  export type OnScrolled = (info: ScrollInfo) => void;

  export interface ScrollInfo {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
    isLastScrollArea: boolean;
  }

  export interface Props { 
    targetElementRef: { current: any };

    onScrolled: OnScrolled;
    appScrollCheckTarget?: Target;
    appIsChildApply?: boolean;
  }
}

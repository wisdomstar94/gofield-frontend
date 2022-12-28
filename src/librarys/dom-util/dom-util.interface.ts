export declare namespace IDomUtilLibrary {
  export interface CheckChildDomParams {
    target: HTMLElement | null;
    callback: (event: MutationRecord[]) => void;
    options?: MutationObserverInit;
  }
}

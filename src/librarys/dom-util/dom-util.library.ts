import { IDomUtilLibrary } from "./dom-util.interface";

export const checkChildDom = (params: IDomUtilLibrary.CheckChildDomParams): MutationObserver | null => {
  if (params.target === null) {
    console.error('target 이 null 입니다.');
    return null;
  }

  const observer = new MutationObserver((_mutations) => {
    params.callback(_mutations);
  });

  const option = {
    attributes: typeof params.options?.attributes === 'boolean' ? params.options?.attributes : true,
    childList: typeof params.options?.childList === 'boolean' ? params.options?.childList : true,
    characterData: typeof params.options?.characterData === 'boolean' ? params.options?.characterData : true,
  };

  observer.observe(params.target, option);
  return observer;
};

const mutationObserverDisconnect = (observer: MutationObserver): boolean => {
  observer.disconnect();
  return true;
};

export const childAllRemove = (element: HTMLElement): void => {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
};

export const getOffsetInfo = (event: Event) => {
  const result = {
    offsetX: 0,
    offsetY: 0,
  };

  if (event instanceof MouseEvent) {
    result.offsetX = event.offsetX;
    result.offsetY = event.offsetY;
  } else if (event instanceof TouchEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    result.offsetX = (event.touches[0].clientX - window.pageXOffset - rect.left);
    result.offsetY = (event.touches[0].clientY - window.pageYOffset - rect.top);
  }

  return result;
}

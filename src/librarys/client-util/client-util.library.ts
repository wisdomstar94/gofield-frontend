export const goToScroll = (params: { 
  scrollContainerElement: HTMLElement | null | undefined;
  targetElement: HTMLElement | null | undefined;
}) => {
  if (params.scrollContainerElement === null || params.scrollContainerElement === undefined) {
    return;
  }

  if (params.targetElement === null || params.targetElement === undefined) {
    return;
  }

  params.scrollContainerElement.scrollTop = params.targetElement.offsetTop;
};
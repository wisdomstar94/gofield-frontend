import { UAParser } from 'ua-parser-js';

export const getBrowserInfo = () => {
  const parser = new UAParser();
  return parser.getBrowser();
};

export const getOsInfo = () => {
  const parser = new UAParser();
  return parser.getOS();
};

export const getDeviceInfo = () => {
  const parser = new UAParser();
  return parser.getDevice();
};

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
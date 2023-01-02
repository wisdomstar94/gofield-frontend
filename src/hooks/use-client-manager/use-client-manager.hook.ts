import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../atoms/device-type.atom";

const useClientManager = () => {
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  const getDeviceWidth = useCallback(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    return window.innerWidth;
  }, []);

  const getDeviceHeight = useCallback(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    return window.innerHeight;
  }, []);

  const getWindowSizeContainerWidth = useCallback(() => {
    if (deviceType === 'mobile') {
      return getDeviceWidth();
    }

    return getDeviceHeight() * 0.56;
  }, [deviceType, getDeviceHeight, getDeviceWidth]);

  const getWindowSizeContainerWidthHalf = useCallback(() => {
    return Math.ceil(getWindowSizeContainerWidth() / 2);
  }, [getWindowSizeContainerWidth]);

  return {
    getDeviceWidth,
    getDeviceHeight,
    getWindowSizeContainerWidth,
    getWindowSizeContainerWidthHalf,
  };
};

export default useClientManager;
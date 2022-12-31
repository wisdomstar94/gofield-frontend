import { useCallback } from "react";

const useImageManager = () => {
  const getImageUrl = useCallback((originalUrl: string | undefined, sizeOptionQueryString?: string) => {
    if (typeof originalUrl !== 'string') {
      return '';
    }

    if (!originalUrl.includes('http://') && !originalUrl.includes('https://')) {
      return originalUrl;
    }

    if (originalUrl.includes('?')) {
      return originalUrl;
    }

    if (typeof sizeOptionQueryString !== 'string') {
      return originalUrl;
    }

    return originalUrl + sizeOptionQueryString;
  }, []);

  return {
    getImageUrl,
  };
};

export default useImageManager;
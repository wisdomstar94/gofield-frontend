import { useCallback } from "react";
import { ISearch } from "../../interfaces/search/search.interface";

const key = 'RECENT_KEYWORDS';

function isValid(jsonString: any) {
  if (typeof jsonString !== 'string') {
    return false;
  }

  if (jsonString.trim() === '') {
    return false;
  }

  let keywords = [];
  try {
    keywords = JSON.parse(jsonString);
  } catch (e) {
    return false;
  }

  for (const item of keywords) {
    if (typeof item !== 'object') {
      return false;
    }

    if (isNaN(item.id)) {
      return false;
    }

    if (typeof item.keyword !== 'string') {
      return false;
    }
  }

  return true;
}

const useRecentKeyword = () => {
  const getKeywords = useCallback((): ISearch.KeywordItem[] => {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const keywordsString = localStorage.getItem(key);
    if (isValid(keywordsString)) {
      return JSON.parse(keywordsString!);
    }
    return [];
  }, []);

  const addKeyword = useCallback((keyword: string) => {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const keywords = getKeywords();
    if (keywords.length > 20) {
      keywords.shift();
    }
    keywords.unshift({ id: new Date().getTime(), keyword: keyword });
    localStorage.setItem(key, JSON.stringify(keywords));
  }, [getKeywords]);

  return {
    getKeywords,
    addKeyword,
  };
};

export default useRecentKeyword;
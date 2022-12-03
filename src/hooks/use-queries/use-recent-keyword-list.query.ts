import { useQuery } from 'react-query';
import useRecentKeyword from '../use-recent-keyword/use-recent-keyword.hook';

const QUERY_KEY = 'recentKeywordList';

const useRecentKeywordListQuery = () => {
  const recentKeyword = useRecentKeyword();

  return useQuery(QUERY_KEY, () => recentKeyword.getKeywords(), {
    staleTime: 100,
  });
};

export default useRecentKeywordListQuery;
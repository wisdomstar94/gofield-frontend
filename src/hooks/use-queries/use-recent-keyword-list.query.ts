import { useQuery } from 'react-query';
import useSearchRecentKeywordListApi from '../use-apis/use-search-recent-keyword-list.api';
import useRecentKeyword from '../use-recent-keyword/use-recent-keyword.hook';
import useUser from '../use-user-hook/use-user.hook';

const QUERY_KEY = 'recentKeywordList';

const useRecentKeywordListQuery = () => {
  const recentKeyword = useRecentKeyword(); // local
  const searchRecentKeywordListApi = useSearchRecentKeywordListApi(); // server
  const user = useUser();

  return useQuery(QUERY_KEY, () => {
    if (user.isLogined()) {
      return searchRecentKeywordListApi.getInstance('').then((response) => {
        return response.data.data;
      });
    }

    return recentKeyword.getKeywords();
  }, {
    staleTime: 100,
  });
};

export default useRecentKeywordListQuery;
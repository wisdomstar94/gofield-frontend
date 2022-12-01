import { useQuery } from 'react-query';
import useSearchRecommendKeywordListApi from '../use-apis/use-search-recommend-keyword-list.api';

const QUERY_KEY = 'searchRecommendKeywordList';

const useSearchRecommendKeywordListQuery = () => {
  const searchRecommendKeywordListApi = useSearchRecommendKeywordListApi();

  return useQuery(QUERY_KEY, () => searchRecommendKeywordListApi.getInstance('?size=20').then((response) => response.data.data), {
    staleTime: 1000 * 60 * 5,
  });
};

export default useSearchRecommendKeywordListQuery;
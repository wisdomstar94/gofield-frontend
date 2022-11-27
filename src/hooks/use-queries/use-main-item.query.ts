import { useQuery } from 'react-query';
import useMainItemListApi from '../use-apis/use-main-item-list.api';

const QUERY_KEY = 'mainItemList';

const useMainItemListQuery = () => {
  const mainItemListApi = useMainItemListApi();

  return useQuery(QUERY_KEY, () => mainItemListApi.getInstance().then((response) => response.data.data), {
    staleTime: 1000,
  });
};

export default useMainItemListQuery;
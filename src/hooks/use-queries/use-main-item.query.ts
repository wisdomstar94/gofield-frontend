import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import { useMainItemList } from '../use-api-hook/use-api.hook';

const QUERY_KEY = 'mainItemList';

const useMainItemListQuery = () => {
  const mainItemList = useMainItemList();

  return useQuery(QUERY_KEY, () => mainItemList.getInstance().then((response) => response.data.data), {
    staleTime: 1000,
  });
};

export default useMainItemListQuery;
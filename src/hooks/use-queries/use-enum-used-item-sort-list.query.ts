import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumUsedItemSortList from '../use-apis/use-enum-used-item-sort-list.api';

const QUERY_KEY = 'enumUsedItemSortList';

const useEnumUsedItemSortListQuery = () => {
  const enumUsedItemSortList = useEnumUsedItemSortList();

  return useQuery(QUERY_KEY, () => enumUsedItemSortList.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumUsedItemSortListQuery;
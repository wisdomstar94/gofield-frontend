import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumBundleItemSortList from '../use-apis/use-enum-bundle-item-sort-list.api';

const QUERY_KEY = 'enumBundleItemSortList';

const useEnumBundleItemSortListQuery = () => {
  const enumBundleItemSortList = useEnumBundleItemSortList();

  return useQuery(QUERY_KEY, () => enumBundleItemSortList.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumBundleItemSortListQuery;
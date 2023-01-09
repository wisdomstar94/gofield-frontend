import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumFaqTypeListApi from '../use-apis/use-enum-faq-type-list.api';

const QUERY_KEY = 'enumFaqTypeList';

const useEnumFaqTypeListQuery = () => {
  const enumFaqTypeListApi = useEnumFaqTypeListApi();

  return useQuery(QUERY_KEY, () => enumFaqTypeListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumFaqTypeListQuery;
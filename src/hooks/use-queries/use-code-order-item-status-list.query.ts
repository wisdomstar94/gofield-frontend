import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodeOrderItemStatusListApi from '../use-apis/use-code-order-item-status-list.api';

const QUERY_KEY = 'codeOrderItemStatusList';

const useCodeOrderItemStatusListQuery = () => {
  const orderItemStatusListApi = useCodeOrderItemStatusListApi();
  
  return useQuery(QUERY_KEY, () => orderItemStatusListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodeOrderItemStatusListQuery;
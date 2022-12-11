import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodeOrderShippingStatusListApi from '../use-apis/use-code-order-shipping-status-list.api';

const QUERY_KEY = 'codeOrderShippingStatusList';

const useCodeOrderShippingStatusListQuery = () => {
  const orderShippingStatusListApi = useCodeOrderShippingStatusListApi();
  
  return useQuery(QUERY_KEY, () => orderShippingStatusListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodeOrderShippingStatusListQuery;
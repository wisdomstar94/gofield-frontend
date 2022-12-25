import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumOrderShippingStatusListApi from '../use-apis/use-enum-order-shipping-status-list.api';

const QUERY_KEY = 'enumOrderShippingStatusList';

const useEnumOrderShippingStatusListQuery = () => {
  const enumOrderShippingStatusListApi = useEnumOrderShippingStatusListApi();
  
  return useQuery(QUERY_KEY, () => enumOrderShippingStatusListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumOrderShippingStatusListQuery;
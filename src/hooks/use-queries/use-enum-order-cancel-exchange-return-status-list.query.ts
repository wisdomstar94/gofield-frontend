import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumOrderCancelExchangeReturnStatusListApi from '../use-apis/use-enum-order-cancel-exchange-return-status-list.api';

const QUERY_KEY = 'enumOrderCancelExchangeReturnStatusList';

const useEnumOrderCancelExchangeReturnStatusListQuery = () => {
  const enumOrderCancelExchangeReturnStatusListApi = useEnumOrderCancelExchangeReturnStatusListApi();

  return useQuery(QUERY_KEY, () => enumOrderCancelExchangeReturnStatusListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumOrderCancelExchangeReturnStatusListQuery;
import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumOrderCancelExchangeReturnTypeListApi from '../use-apis/use-enum-order-cancel-exchange-return-type-list.api';

const QUERY_KEY = 'enumOrderCancelExchangeReturnTypeList';

const useEnumOrderCancelExchangeReturnTypeListQuery = () => {
  const enumOrderCancelExchangeReturnTypeListApi = useEnumOrderCancelExchangeReturnTypeListApi();

  return useQuery(QUERY_KEY, () => enumOrderCancelExchangeReturnTypeListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumOrderCancelExchangeReturnTypeListQuery;
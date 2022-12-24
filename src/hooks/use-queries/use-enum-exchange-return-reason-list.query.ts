import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumExchangeReturnReasonListApi from '../use-apis/use-enum-exchange-return-reason-list.api';

const QUERY_KEY = 'enumExchangeReturnReasonList';

const useEnumExchangeReturnReasonListQuery = () => {
  const enumExchangeReturnReasonListApi = useEnumExchangeReturnReasonListApi();

  return useQuery(QUERY_KEY, () => enumExchangeReturnReasonListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumExchangeReturnReasonListQuery;
import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useEnumOrderCancelReasonListApi from '../use-apis/use-enum-order-cancel-reason-list.api';

const QUERY_KEY = 'enumOrderCancelReasonList';

const useEnumOrderCancelReasonListQuery = () => {
  const enumOrderCancelReasonListApi = useEnumOrderCancelReasonListApi();

  return useQuery(QUERY_KEY, () => enumOrderCancelReasonListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.description,
      value: item.key,
    } as ICommon.ValueItem;
  })), {
    staleTime: 1000 * 10,
  });
};

export default useEnumOrderCancelReasonListQuery;
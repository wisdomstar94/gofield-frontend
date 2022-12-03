import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodePaymentEasypayListApi from '../use-apis/use-code-payment-easypay-list.api';

const QUERY_KEY = 'codePaymentEasypayList';

const useCodePaymentEasypayListQuery = () => {
  const codePaymentEasypayListApi = useCodePaymentEasypayListApi();
  
  return useQuery(QUERY_KEY, () => codePaymentEasypayListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodePaymentEasypayListQuery;
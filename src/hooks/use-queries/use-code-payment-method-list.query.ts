import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodePaymentMethodListApi from '../use-apis/use-code-payment-method-list.api';

const QUERY_KEY = 'codePaymentMethodList';

const useCodePaymentMethodListQuery = () => {
  const codePaymentMethodListApi = useCodePaymentMethodListApi();
  
  return useQuery(QUERY_KEY, () => codePaymentMethodListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodePaymentMethodListQuery;
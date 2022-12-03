import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useCodePaymentCardListApi from '../use-apis/use-code-payment-card-list.api';


const QUERY_KEY = 'codePaymentCardList';

const useCodePaymentCardListQuery = () => {
  const codePaymentCardListApi = useCodePaymentCardListApi();
  
  return useQuery(QUERY_KEY, () => codePaymentCardListApi.getInstance().then((response) => response.data.data.map((item) => {
    return {
      text: item.name,
      value: item.code,
    } as ICommon.ValueItem;
  })), {
    staleTime: 100000,
  });
};

export default useCodePaymentCardListQuery;
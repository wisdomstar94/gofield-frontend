import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';

const QUERY_KEY = 'cancelReasonList';

const useCancelReasonListQuery = () => {
  const valueItems: ICommon.ValueItem[] = [
    { text: '상품이 마음에 들지 않음 (단순변심)', value: '001' },
    { text: '다른 상품 추가 후 재주문 예정', value: '002' },
    { text: '상품이 문제 있음 (불량)', value: '003' },
    { text: '오배송 및 배송 누락', value: '004' },
  ];
  
  return useQuery(QUERY_KEY, () => Promise.resolve(valueItems), {
    staleTime: 100000,
  });
};

export default useCancelReasonListQuery;
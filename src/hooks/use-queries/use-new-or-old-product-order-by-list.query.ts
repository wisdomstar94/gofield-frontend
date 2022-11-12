import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';

const QUERY_KEY = 'newOrOldProductOrderByList';

const useNewOrOldProductOrderByListQuery = () => {
  const valueItems: ICommon.ValueItem[] = [
    { text: '최저가순', value: 'low-price' },
    { text: '최근등록순', value: 'recent-upload' },
    { text: '무료배송', value: 'free-delivery' },
  ];
  
  return useQuery(QUERY_KEY, () => Promise.resolve(valueItems), {
    staleTime: 100000,
  });
};

export default useNewOrOldProductOrderByListQuery;
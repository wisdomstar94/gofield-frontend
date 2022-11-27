import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';

const QUERY_KEY = 'productCategoryList';

const useProductCategoryListQuery = () => {
  const valueItems: ICommon.ValueItem[] = [
    { text: '골프', value: '1' },
    { text: '자전거', value: '2' },
    { text: '테니스', value: '4' },
    { text: '배드민턴', value: '21' },
    { text: '아웃도어', value: '20' },
    { text: '수상스포츠', value: '17' },
    { text: '겨울스포츠', value: '16' },
    { text: '구기스포츠', value: '18' },
    { text: '피트니스', value: '3' },
    { text: '기타', value: '10' },
  ];
  
  return useQuery(QUERY_KEY, () => Promise.resolve(valueItems), {
    staleTime: 100000,
  });
};

export default useProductCategoryListQuery;
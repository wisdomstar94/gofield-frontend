import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';

const QUERY_KEY = 'categoryTypeList';

const useCategoryListTypeQuery = (categoryId: string) => {
  const QUERY_KEY_REAL = QUERY_KEY + categoryId;

  const valueItems: ICommon.ValueItem[] = [
    { text: '전체', value: '' },
    { text: '드라이버', value: 'driver' },
    { text: '우드', value: 'wood' },
    { text: '아이언', value: 'ian' },
    { text: '웨지', value: 'wegee' },
    { text: '퍼터', value: 'perter' },
    { text: '기타', value: 'etc' },
  ];
  
  return useQuery(QUERY_KEY_REAL, () => Promise.resolve(categoryId === '' ? [] : valueItems), {
    staleTime: 100000,
  });
};

export default useCategoryListTypeQuery;
import { useQuery } from 'react-query';
import { IViewFilterBox } from '../../components/boxes/view-filter-box/view-filter-box.interface';
import { ICommon } from '../../interfaces/common/common.interface';

const QUERY_KEY = 'viewFilterOptionItemList';

const useViewFilterOptionItemListQuery = (optionType: IViewFilterBox.OptionType) => {
  const QUERY_KEY_REAL = QUERY_KEY + optionType;

  const valueItems: ICommon.ValueItem[] = [];
  
  switch (optionType) {
    case 'category': 
      valueItems.push({ text: '전체', value: 'all' });
      valueItems.push({ text: '골프', value: 'golf' });
      valueItems.push({ text: '자전거', value: 'bicycle' });
      valueItems.push({ text: '테니스', value: 'tennis' });
      valueItems.push({ text: '배드민턴', value: 'badminton' });
      valueItems.push({ text: '아웃도어', value: 'outdoor' });
      valueItems.push({ text: '피트니스', value: 'fitness' });
      valueItems.push({ text: '수상스포츠', value: 'waterSports' });
      valueItems.push({ text: '겨울스포츠', value: 'winterSports' });
      valueItems.push({ text: '구기스포츠', value: 'ballSports' });
      valueItems.push({ text: '기타스포츠', value: 'etcSports' });
      break;
    case 'order-by':
      valueItems.push({ text: '추천순', value: 'recommend' });
      valueItems.push({ text: '최신순', value: 'latest' });
      valueItems.push({ text: '오래된순', value: 'oldest' });
      valueItems.push({ text: '높은가격순', value: 'highPrice' });
      valueItems.push({ text: '낮은가격순', value: 'lowPrice' });
      break;
    case 'product-status':
      valueItems.push({ text: '최상', value: 'bestUpper' });
      valueItems.push({ text: '상', value: 'upper' });
      valueItems.push({ text: '중', value: 'middle' });
      valueItems.push({ text: '하', value: 'lower' });
      break;
  }
  
  return useQuery(QUERY_KEY_REAL, () => Promise.resolve(valueItems), {
    staleTime: 100000,
  });
};

export default useViewFilterOptionItemListQuery;
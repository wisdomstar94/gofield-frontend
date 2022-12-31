import { useQuery } from 'react-query';
import useItemSellerInfoApi from '../use-apis/use-item-seller-info.api';

const QUERY_KEY = 'itemSellerInfo';

const useItemSellerInfoQuery = (itemNumber: string) => {
  const itemSellerInfoApi = useItemSellerInfoApi();

  return useQuery(QUERY_KEY + `_${itemNumber}`, () => {
    if (typeof itemNumber !== 'string' || itemNumber === '') {
      return undefined;
    } else {
      return itemSellerInfoApi.getInstance(itemNumber).then((response) => {
        return response.data.data;
      });
    }
  }, {
    staleTime: 1000 * 60,
  });
};

export default useItemSellerInfoQuery;
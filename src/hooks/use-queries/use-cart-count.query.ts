import { useQuery } from 'react-query';
import useCartCountApi from '../use-apis/use-cart-count.api';

const QUERY_KEY = 'cartCount';

const useCartCountQuery = () => {
  const cartCountQuery = useCartCountApi();

  return useQuery(QUERY_KEY, () => cartCountQuery.getInstance().then((response) => response.data.data.totalCount), {
    staleTime: 1000 * 60 * 30,
  });
};

export default useCartCountQuery;
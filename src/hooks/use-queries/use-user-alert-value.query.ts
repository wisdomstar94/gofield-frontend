import { useQuery } from 'react-query';
import useUserAlertValueApi from '../use-apis/use-user-alert-value.api';

const QUERY_KEY = 'userAlertValue';

const useUserAlertValueQuery = () => {
  const userAlertValueApi = useUserAlertValueApi();

  return useQuery(QUERY_KEY, () => userAlertValueApi.getInstance().then((response) => {
    return response.data.data.isAlertPromotion;
  }), {
    staleTime: 1000 * 10,
  });
};

export default useUserAlertValueQuery;
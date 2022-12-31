import { useQuery } from 'react-query';
import useUserAccountInfoApi from '../use-apis/use-user-account-info.api';

const QUERY_KEY = 'userAccountInfo';

const useUserAccountInfoQuery = () => {
  const userAccountInfoApi = useUserAccountInfoApi();

  return useQuery(QUERY_KEY, () => userAccountInfoApi.getInstance().then((response) => {
    return response.data.data;
  }), {
    staleTime: 0,
  });
};

export default useUserAccountInfoQuery;
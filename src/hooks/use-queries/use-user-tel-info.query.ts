import { useQuery } from 'react-query';
import useUserTelInfoApi from '../use-apis/use-user-tel-info.api';

const QUERY_KEY = 'userTelInfo';

const useUserTelInfoQuery = () => {
  const userTelInfoApi = useUserTelInfoApi();

  return useQuery(QUERY_KEY, () => userTelInfoApi.getInstance().then((response) => {
    return response.data.data;
  }), {
    staleTime: 0,
  });
};

export default useUserTelInfoQuery;
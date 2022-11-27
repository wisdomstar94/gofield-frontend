import { useQuery } from 'react-query';
import { ICommon } from '../../interfaces/common/common.interface';
import useUserProfileApi from '../use-apis/use-user-profile.api';

const QUERY_KEY = 'userProfile';

const useUserProfileQuery = () => {
  const userProfileApi = useUserProfileApi();
  
  return useQuery(QUERY_KEY, () => userProfileApi.getInstance().then((response) => response.data.data), {
    staleTime: 100000,
  });
};

export default useUserProfileQuery;
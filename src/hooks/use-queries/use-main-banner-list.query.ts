import { useQuery } from 'react-query';
import { useMainBannerList } from '../use-api-hook/use-api.hook';

const QUERY_KEY = 'mainBannerList';

const useMainBannerListQuery = () => {
  const mainBannerList = useMainBannerList();

  return useQuery(QUERY_KEY, () => mainBannerList.getInstance().then((response) => {
    return response.data.data;
  }), {
    staleTime: 100000,
  });
};

export default useMainBannerListQuery;
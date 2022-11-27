import { useQuery } from 'react-query';
import useMainBannerListApi from '../use-apis/use-main-banner-list.api';

const QUERY_KEY = 'mainBannerList';

const useMainBannerListQuery = () => {
  const mainBannerListApi = useMainBannerListApi();

  return useQuery(QUERY_KEY, () => mainBannerListApi.getInstance().then((response) => {
    return response.data.data;
  }), {
    staleTime: 100000,
  });
};

export default useMainBannerListQuery;
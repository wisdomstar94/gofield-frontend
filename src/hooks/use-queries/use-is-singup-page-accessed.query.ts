import { useQuery } from 'react-query';

const QUERY_KEY = 'isSignupPageAccessed';

const getIsSignupPageAccessed = (): boolean | null => {
  const isSignupPageAccessed = localStorage.getItem(QUERY_KEY);
  if (isSignupPageAccessed === null) {
    return false;
  }

  if (isSignupPageAccessed === 'true') {
    return true;
  }

  if (isSignupPageAccessed === 'false') {
    return false;
  }

  return null;
};

export const setIsSignupPageAccessed = (v: boolean) => {
  localStorage.setItem(QUERY_KEY, v ? 'true' : 'false');
};

const useIsSignupPageAccessedQuery = () => {
  return useQuery(QUERY_KEY, () => getIsSignupPageAccessed(), {
    staleTime: 1000 * 10,
  });
};

export default useIsSignupPageAccessedQuery;
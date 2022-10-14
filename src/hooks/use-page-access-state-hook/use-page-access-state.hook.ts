import { useEffect, useState } from "react";
import { IPageAccessStateHook } from "./use-page-access-state.hook.interface";

const usePageAccessState = () => {
  const [pageAccessState, setAccessState] = useState<IPageAccessStateHook.PageAccessState>('');

  useEffect(() => {
    // access token 유효성 체크
    // ...추후 작성 필요.
    setAccessState('granted');
  }, []);

  return pageAccessState;
};

export default usePageAccessState;

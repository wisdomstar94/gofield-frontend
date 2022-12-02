import { useCallback, useState } from "react";
import { getRandomToken } from "../../librarys/random-util/random-util.library";

const useRender = () => {
  const [value, setValue] = useState('');

  const render = useCallback(() => {
    setValue(getRandomToken({ strLength: 20 }));
  }, []);

  return {
    render,
    value,
  };
};

export default useRender;
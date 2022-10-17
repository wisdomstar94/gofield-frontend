import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { axiosGloballErrorAtom, axiosGlobalResponseAtom } from "../atoms/axios.atom";

const RootComponent: React.FC<{ children: React.ReactNode; }> = (props) => {
  const [axiosGloballError, setAxiosGloballError] = useRecoilState(axiosGloballErrorAtom);
  const [axiosGloballResponse, setAxiosGloballResponse] = useRecoilState(axiosGlobalResponseAtom);

  useEffect(() => {
    if (axiosGloballError === null) {
      return;
    }
    
    if (axiosGloballError?.response?.data.action === 'TOAST') {
      alert(axiosGloballError?.response?.data.message);
    }
  }, [axiosGloballError]);

  useEffect(() => {
    if (axiosGloballResponse === null) {
      return;
    }

    
  }, [axiosGloballResponse]);

  return (
    <>
      {props.children}
    </>
  );
};

export default RootComponent;

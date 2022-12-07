import { useEffect, useState } from "react";
import styles from "./custom-suspense.component.module.scss";
import { ICustomSuspense } from "./custom-suspense.interface";

const CustomSuspense = (props: ICustomSuspense.Props) => {
  const [isShow, setIsShow] = useState(props.__isShow);
  useEffect(() => { setIsShow(props.__isShow) }, [props.__isShow]);

  return (
    <>
      { isShow ? props.children : <></> }
    </>
  );
};

export default CustomSuspense;
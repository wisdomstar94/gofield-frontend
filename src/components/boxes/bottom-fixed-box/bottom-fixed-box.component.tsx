import { useRecoilState } from "recoil";
import { deviceTypeAtom } from "../../../atoms/device-type.atom";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./bottom-fixed-box.component.module.scss";
import { IBottomFixedBox } from "./bottom-fixed-box.interface";

const BottomFixedBox = (props: IBottomFixedBox.Props) => {
  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);

  return (
    <>
      <div className={getClasses([
        styles['container'],
        styles[deviceType],
      ])}>
        { props.children }
      </div>
    </>
  );
};

export default BottomFixedBox;
import styles from "./preparing-box.component.module.scss";
import { IPreparingBox } from "./preparing-box.interface";

const PreparingBox = (props: IPreparingBox.Props) => {
  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-center h-20">
        <div className="inline-flex flex-wrap">
          <span className="inline-flex flex-wrap font-light text-sm text-black-a">해당 페이지는 준비중입니다.</span>
        </div>
      </div>
    </>
  );
};

export default PreparingBox;
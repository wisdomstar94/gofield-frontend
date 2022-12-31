import styles from "./title-content-box-v1.component.module.scss";
import { ITitleContentBoxV1 } from "./title-content-box-v1.interface";

const TitleContentBoxV1 = (props: ITitleContentBoxV1.Props) => {
  return (
    <>
      <div className="w-full block px-6 pt-6">
        <div data-name="title-row" className="w-full block">
          <span className="font-bold text-base text-black-a">{ props.__title }</span>
        </div>
        <div data-name="content-row" className="w-full block">
          <span className="font-normal text-sm text-black-b">{ props.__content }</span>
        </div>
      </div>
    </>
  );
};

export default TitleContentBoxV1;
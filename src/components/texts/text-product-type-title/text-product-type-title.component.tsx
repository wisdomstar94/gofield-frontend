import styles from "./text-product-type-title.component.module.scss";
import { ITextProductTypeTitle } from "./text-product-type-title.interface";

const TextProductTypeTitle = (props: ITextProductTypeTitle.Props) => {
  return (
    <>
      <span className={styles['container']}>{ props.children }</span>
    </>
  );
};

export default TextProductTypeTitle;
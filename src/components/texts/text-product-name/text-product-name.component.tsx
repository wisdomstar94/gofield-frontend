import styles from "./text-product-name.component.module.scss";
import { ITextProductName } from "./text-product-name.interface";

const TextProductName = (props: ITextProductName.Props) => {
  return (
    <>
      <span className={styles['container']}>{ props.children }</span>
    </>
  );
};

export default TextProductName;
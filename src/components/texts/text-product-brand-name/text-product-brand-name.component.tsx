import styles from "./text-product-brand-name.component.module.scss";
import { ITextProductBrandName } from "./text-product-brand-name.interface";

const TextProductBrandName = (props: ITextProductBrandName.Props) => {
  return (
    <>
      <span className={styles['container']}>{ props.children }</span>
    </>
  );
};

export default TextProductBrandName;
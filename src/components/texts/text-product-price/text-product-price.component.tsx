import styles from "./text-product-price.component.module.scss";
import { ITextProductPrice } from "./text-product-price.interface";

const TextProductPrice = (props: ITextProductPrice.Props) => {
  return (
    <>
      <span className={styles['container']}>{ props.children }</span>
    </>
  );
};

export default TextProductPrice;
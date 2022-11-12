import styles from "./text-more-view-button.component.module.scss";
import { ITextMoreViewButton } from "./text-more-view-button.interface";

const TextMoreViewButton = (props: ITextMoreViewButton.Props) => {
  return (
    <>
      <span className={styles['container']}>{ props.children }</span>
    </>
  );
};

export default TextMoreViewButton;
import FormListBox from "../form-list-box/form-list-box.component";
import styles from "./order-form-box.component.module.scss";
import { IOrderFormBox } from "./order-form-box.interface";

const OrderFormBox = (props: IOrderFormBox.Props) => {
  return (
    <>
      <FormListBox
        __formItems={[
          {
            titleComponent: <></>,
            contentComponent: <></>,
          },
        ]} />
    </>
  );
};

export default OrderFormBox;
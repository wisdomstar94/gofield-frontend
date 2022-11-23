import ProductRowItem3 from "../product-row-item3/product-row-item3.component";
import styles from "./order-row-item.component.module.scss";
import { IOrderRowItem } from "./order-row-item.interface";

const OrderRowItem = (props: IOrderRowItem.Props) => {
  return (
    <div className="w-full block">
      <div className="block mt-4 mx-6 grid grid-cols-2">
        <div className="text-sm font-bold text-black-a">
          2022.02.01
        </div>
        <div className="flex text-sm font-bold text-black-a justify-end cursor-pointer">
          주문 상세보기 {'>'}
        </div>
      </div>
      <ProductRowItem3 />
      <ProductRowItem3 />
      <ProductRowItem3 />
    </div>
  );
};

export default OrderRowItem;
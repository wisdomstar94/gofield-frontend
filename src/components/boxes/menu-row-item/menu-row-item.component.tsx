import { useCallback } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import SvgArrowRightIcon from "../../svgs/svg-arrow-right-icon/svg-arrow-right-icon.component";
import styles from "./menu-row-item.component.module.scss";
import { IMenuRowItem } from "./menu-row-item.interface";

const MenuRowItem = (props: IMenuRowItem.Props) => {
  const itemClick = useCallback(() => {
    if (typeof props.__onClick === 'function') {
      props.__onClick();
    }
  }, [props]);

  return (
    <>
      <div className={getClasses([styles['menu-row-item'], props?.__isEnableTopBorder === true ? styles['border-top'] : styles['']])} onClick={itemClick}>
        <div className={styles['left']}>
          { props.children }
        </div>
        <div className={styles['right']}>
          <SvgArrowRightIcon />
        </div>
      </div>
    </>
  );
};

export default MenuRowItem;
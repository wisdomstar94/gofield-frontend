import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "./menu-row-list.component.module.scss";
import { IMenuRowList } from "./menu-row-list.interface";

const MenuRowList = (props: IMenuRowList.Props) => {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<IMenuRowList.MenuItem[] | undefined>();

  useEffect(() => {
    setMenuItems(props.__menuItems);
  }, [props.__menuItems]);

  const menuItemClick = useCallback((item: IMenuRowList.MenuItem) => {
    if (typeof item.menuClickCallback === 'function') {
      item.menuClickCallback();
      return;
    }

    if (item.menuLink === '') {
      return;
    }
    router.push(item.menuLink);
  }, [router]);

  return (
    <>
      <ul className={styles['menu-list']}>
        {
          menuItems?.map((item, index) => {
            return (
              <li key={index} className={styles['item']} onClick={e => menuItemClick(item)}>
                <div className={styles['item-content-box']}>
                  { item.menuNameComponent }
                </div>
              </li>
            )
          })
        }
      </ul>
    </>
  );
};

export default MenuRowList;
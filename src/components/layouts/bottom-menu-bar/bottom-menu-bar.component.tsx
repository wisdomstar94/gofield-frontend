import { useState } from 'react';
import styles from './bottom-menu-bar.component.module.scss';
import SvgBottomMenuCategoryIcon from '../../svgs/svg-bottom-menu-category-icon/svg-bottom-menu-category-icon.component';
import SvgBottomMenuHomeIcon from '../../svgs/svg-bottom-menu-home-icon/svg-bottom-menu-home-icon.component';
import SvgBottomMenuLikeIcon from '../../svgs/svg-bottom-menu-like-icon/svg-bottom-menu-like-icon.component';
import SvgBottomMenuMyPageIcon from '../../svgs/svg-bottom-menu-my-page-icon/svg-bottom-menu-my-page-icon.component';
import SvgBottomMenuOldProductIcon from '../../svgs/svg-bottom-menu-old-product-icon/svg-bottom-menu-old-product-icon.component';
import { IBottomMenuBar } from './bottom-menu-bar.interface';

const BottomMenuBar = (props: IBottomMenuBar.Props) => {
  const [menuItems, setMenuItems] = useState<IBottomMenuBar.MenuItem[]>([
    {
      menuIconComponent: <><SvgBottomMenuCategoryIcon /></>,
      menuNameComponent: <>카테고리</>,
      menuLink: '',
    },
    {
      menuIconComponent: <><SvgBottomMenuOldProductIcon /></>,
      menuNameComponent: <>중고상품</>,
      menuLink: '',
    },
    {
      menuIconComponent: <><SvgBottomMenuHomeIcon /></>,
      menuNameComponent: <>홈</>,
      menuLink: '',
    },
    {
      menuIconComponent: <><SvgBottomMenuLikeIcon /></>,
      menuNameComponent: <>좋아요</>,
      menuLink: '',
    },
    {
      menuIconComponent: <><SvgBottomMenuMyPageIcon /></>,
      menuNameComponent: <>마이페이지</>,
      menuLink: '',
    },
  ]);

  return (
    <>
      <div className={styles['container']} style={props.__style}>
        <ul className={styles['menu-list']}>
          {
            menuItems.map((item, index) => {
              return (
                <li className={styles['menu-item']} 
                  key={index}>
                  <div className={styles['icon-area']}>
                    { item.menuIconComponent }
                  </div>
                  <div className={styles['menu-name-area']}>
                    { item.menuNameComponent }
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
};

export default BottomMenuBar;
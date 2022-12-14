import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './bottom-menu-bar.component.module.scss';
import SvgBottomMenuCategoryIcon from '../../svgs/svg-bottom-menu-category-icon/svg-bottom-menu-category-icon.component';
import SvgBottomMenuHomeIcon from '../../svgs/svg-bottom-menu-home-icon/svg-bottom-menu-home-icon.component';
import SvgBottomMenuLikeIcon from '../../svgs/svg-bottom-menu-like-icon/svg-bottom-menu-like-icon.component';
import SvgBottomMenuMyPageIcon from '../../svgs/svg-bottom-menu-my-page-icon/svg-bottom-menu-my-page-icon.component';
import SvgBottomMenuOldProductIcon from '../../svgs/svg-bottom-menu-old-product-icon/svg-bottom-menu-old-product-icon.component';
import { IBottomMenuBar } from './bottom-menu-bar.interface';
import { getClasses } from '../../../librarys/string-util/string-util.library';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { deviceTypeAtom } from '../../../atoms/device-type.atom';
import useUser from '../../../hooks/use-user-hook/use-user.hook';
import ModalSignupNotice from '../../modals/modal-signup-notice/modal-signup-notice.component';
import { IModalSignupNotice } from '../../modals/modal-signup-notice/modal-signup-notice.interface';

const BottomMenuBar = (props: IBottomMenuBar.Props) => {
  const router = useRouter();
  const user = useUser();

  const modalSignupNoticeRef = useRef<IModalSignupNotice.RefObject>(null);

  const [deviceType, setDeviceType] = useRecoilState(deviceTypeAtom);
  const [activeMenuId, setActiveMenuId] = useState<IBottomMenuBar.MenuId | undefined>();
  const [menuItems, setMenuItems] = useState<IBottomMenuBar.MenuItem[]>([
    {
      menuId: 'category',
      menuIconComponent: <><SvgBottomMenuCategoryIcon /></>,
      menuNameComponent: <>카테고리</>,
      menuLink: '/category',
    },
    {
      menuId: 'old-product',
      menuIconComponent: <><SvgBottomMenuOldProductIcon /></>,
      menuNameComponent: <>중고상품</>,
      menuLink: '/old',
    },
    {
      menuId: 'home',
      menuIconComponent: <><SvgBottomMenuHomeIcon /></>,
      menuNameComponent: <>홈</>,
      menuLink: '/',
    },
    {
      menuId: 'likes',
      menuIconComponent: <><SvgBottomMenuLikeIcon /></>,
      menuNameComponent: <>좋아요</>,
      menuLink: '/likes',
    },
    {
      menuId: 'my-page',
      menuIconComponent: <><SvgBottomMenuMyPageIcon /></>,
      menuNameComponent: <>마이페이지</>,
      menuLink: '/mypage',
    },
  ]);

  useEffect(() => {
    setActiveMenuId(props.__activeMenuId);
  }, [props.__activeMenuId]);

  const menuItemClick = useCallback((item: IBottomMenuBar.MenuItem) => {
    if (item.menuId === 'my-page' || item.menuId === 'likes') {
      if (!user.isLogined()) {
        modalSignupNoticeRef.current?.show();
        return;
      }
    }

    router.push(item.menuLink);
  }, [router, user]);

  return (
    <>
      <div className={getClasses([
        styles['container'],
        styles[deviceType],
      ])} style={props.__style}>
        <ul className={styles['menu-list']}>
          {
            menuItems.map((item, index) => {
              return (
                <li className={getClasses([styles['menu-item'], item.menuId === activeMenuId ? styles['active'] : ''])} 
                  key={index} onClick={e => menuItemClick(item)}>
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
      <ModalSignupNotice ref={modalSignupNoticeRef} />
    </>
  );
};

export default BottomMenuBar;
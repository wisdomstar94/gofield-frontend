import { useState } from 'react';
import styled from 'styled-components';
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
      <StyleIn.Container style={props.__style}>
        <ul className="menu-list">
          {
            menuItems.map((item, index) => {
              return (
                <li className="menu-item" key={index}>
                  <div className="icon-area">
                    { item.menuIconComponent }
                  </div>
                  <div className="menu-name-area">
                    { item.menuNameComponent }
                  </div>
                </li>
              )
            })
          }
        </ul>
      </StyleIn.Container>
    </>
  );
};

const StyleIn = {
  Container: styled.div<IBottomMenuBar.Props>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 6;
    background-color: #fff;
    border-top: 1px solid #dfebf7;

    ul.menu-list {
      width: 100%;
      display: inline-flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      position: relative;

      > li.menu-item {
        list-style-type: none;
        width: 20%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;

        .icon-area {
          width: 100%;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-name-area {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 0.7rem;
        }
      }
    }
  `,
};

export default BottomMenuBar;
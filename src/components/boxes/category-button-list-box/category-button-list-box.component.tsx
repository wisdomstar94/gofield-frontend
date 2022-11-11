import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import SvgCategoryBaseballIcon from "../../svgs/svg-category-baseball-icon/svg-category-baseball-icon.component";
import SvgCategoryBicycleIcon from "../../svgs/svg-category-bicycle-icon/svg-category-bicycle-icon.component";
import SvgCategoryClothingIcon from "../../svgs/svg-category-clothing-icon/svg-category-clothing-icon.component";
import SvgCategoryEtcIcon from "../../svgs/svg-category-etc-icon/svg-category-etc-icon.component";
import SvgCategoryGolfIcon from "../../svgs/svg-category-golf-icon/svg-category-golf-icon.component";
import SvgCategoryHealthIcon from "../../svgs/svg-category-health-icon/svg-category-health-icon.component";
import SvgCategoryMountainIcon from "../../svgs/svg-category-mountain-icon/svg-category-mountain-icon.component";
import SvgCategorySoccerIcon from "../../svgs/svg-category-soccer-icon/svg-category-soccer-icon.component";
import SvgCategorySwimmingIcon from "../../svgs/svg-category-swimming-icon/svg-category-swimming-icon.component";
import SvgCategoryTennisIcon from "../../svgs/svg-category-tennis-icon/svg-category-tennis-icon.component";
import styles from "./category-button-list-box.component.module.scss";
import { ICategoryButtonListBox } from "./category-button-list-box.interface";

const CategoryButtonListBox = (props: ICategoryButtonListBox.Props) => {
  const router = useRouter();
  const [categoryMenuList, setCategoryMenuList] = useState<ICategoryButtonListBox.CategoryItem[]>([
    {
      categoryId: '001',
      categoryName: '골프',
      icon: <SvgCategoryGolfIcon />,
      link: '/order/13/product/15/delivery',
    },
    {
      categoryId: '002',
      categoryName: '자전거',
      icon: <SvgCategoryBicycleIcon />,
      link: '/order/13/product/15/exchange-return/reason',
    },
    {
      categoryId: '003',
      categoryName: '헬스',
      icon: <SvgCategoryHealthIcon />,
      link: '/order/13/product/15/exchange-return/apply?reasonList=2',
    },
    {
      categoryId: '004',
      categoryName: '등산',
      icon: <SvgCategoryMountainIcon />,
      link: '/cancel-return-exchange',
    },
    {
      categoryId: '005',
      categoryName: '테니스',
      icon: <SvgCategoryTennisIcon />,
      link: '',
    },
    {
      categoryId: '006',
      categoryName: '축구',
      icon: <SvgCategorySoccerIcon />,
      link: '',
    },
    {
      categoryId: '007',
      categoryName: '야구',
      icon: <SvgCategoryBaseballIcon />,
      link: '',
    },
    {
      categoryId: '008',
      categoryName: '수영',
      icon: <SvgCategorySwimmingIcon />,
      link: '',
    },
    {
      categoryId: '009',
      categoryName: '의류',
      icon: <SvgCategoryClothingIcon />,
      link: '',
    },
    {
      categoryId: '010',
      categoryName: '기타',
      icon: <SvgCategoryEtcIcon />,
      link: '',
    },
  ]);

  const categoryButtonClick = useCallback((item: ICategoryButtonListBox.CategoryItem) => {
    router.push(item.link);
  }, [router]);

  return (
    <>
      <div className={[
          styles['container']
        ].join(' ')}
        style={props.__style}>
        <ul className={[
            styles['category-button-list']
          ].join(' ')}>
          {
            categoryMenuList?.map((item, index) => {
              return (
                <li key={index}
                  className={[
                    styles['item']
                  ].join(' ')}
                  onClick={e => categoryButtonClick(item)}>
                  <div className={[
                      styles['icon-area']
                    ].join(' ')}>
                    { item.icon }
                  </div>
                  <div className={[
                      styles['menu-name-area']
                    ].join(' ')}>
                    { item.categoryName }
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
};

export default CategoryButtonListBox;
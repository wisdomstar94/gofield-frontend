import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useCategoryListQuery from "../../../hooks/use-queries/use-category-list.query";
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
  const categoryListQuery = useCategoryListQuery();
  const [categoryMenuList, setCategoryMenuList] = useState<ICategoryButtonListBox.CategoryItem[]>([
    // {
    //   categoryId: '1',
    //   categoryName: '골프',
    //   icon: <SvgCategoryGolfIcon />,
    //   link: '/productGroups/1',
    // },
    // {
    //   categoryId: '2',
    //   categoryName: '자전거',
    //   icon: <SvgCategoryBicycleIcon />,
    //   link: '/productGroups/2',
    // },
    // {
    //   categoryId: '4',
    //   categoryName: '테니스',
    //   icon: <SvgCategoryTennisIcon />,
    //   link: '/productGroups/4',
    // },
    // {
    //   categoryId: '21',
    //   categoryName: '배드민턴',
    //   icon: <SvgCategoryTennisIcon /> /*<SvgCategoryClothingIcon />*/,
    //   link: '/productGroups/21',
    // },
    // {
    //   categoryId: '20',
    //   categoryName: '아웃도어',
    //   icon: <SvgCategoryMountainIcon />,
    //   link: '/productGroups/20',
    // },
    // {
    //   categoryId: '17',
    //   categoryName: '수상스포츠',
    //   icon: <SvgCategorySwimmingIcon />,
    //   link: '/productGroups/17',
    // },
    // {
    //   categoryId: '16',
    //   categoryName: '겨울스포츠',
    //   icon: <SvgCategoryBaseballIcon />,
    //   link: '/productGroups/16',
    // },
    // {
    //   categoryId: '18',
    //   categoryName: '구기스포츠',
    //   icon: <SvgCategorySoccerIcon />,
    //   link: '/productGroups/18',
    // },
    // {
    //   categoryId: '3',
    //   categoryName: '피트니스',
    //   icon: <SvgCategoryHealthIcon />,
    //   link: '/productGroups/3',
    // },
    // {
    //   categoryId: '10',
    //   categoryName: '기타',
    //   icon: <SvgCategoryEtcIcon />,
    //   link: '/productGroups/10',
    // },
  ]);

  useEffect(() => {
    if (!categoryListQuery.isFetched) {
      return;
    }

    if (categoryListQuery.data !== undefined) {
      const list: ICategoryButtonListBox.CategoryItem[] = categoryListQuery.data.map((item) => {
        return {
          categoryId: item.value,
          categoryName: item.text,
          icon: <>
            <Image
              // width={24}
              // height={24}
              src={item.value2 ?? ''}
              alt="카테고리 아이콘 이미지"
              title="카테고리 아이콘 이미지"
              layout="fill"
              objectFit="contain" />
          </>,
          link: '/productGroups/' + item.value,
        };
      });
      for (let i = 0; i < 5; i++) {
        if (list.length % 5 === 0) {
          break;
        }
        list.push({
          isDummy: true,
          categoryId: '',
          categoryName: '',
          icon: <>
            <div className={styles['circle-icon']}></div>
          </>,
          link: '',
        });
      }
      setCategoryMenuList(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryListQuery.isFetched]);

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
                    item.isDummy === true ? styles['dummy'] : '',
                    styles['item'],
                  ].join(' ')}
                  onClick={e => categoryButtonClick(item)}>
                  <div className={[
                      styles['icon-area']
                    ].join(' ')}>
                    { item.icon }
                  </div>
                  {
                    item.isDummy !== true ? 
                    <div className={[
                        styles['menu-name-area']
                      ].join(' ')}>
                      { item.categoryName }
                    </div> : 
                    <div className={styles['dummy-name-area']}>
                      <div className={styles['line']}></div>
                    </div>
                  }
                    
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
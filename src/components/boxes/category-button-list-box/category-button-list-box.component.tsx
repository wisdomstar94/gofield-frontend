import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styles from "./category-button-list-box.component.module.scss";
import { ICategoryButtonListBox } from "./category-button-list-box.interface";

const CategoryButtonListBox = (props: ICategoryButtonListBox.Props) => {
  const router = useRouter();
  const [categoryMenuList, setCategoryMenuList] = useState<ICategoryButtonListBox.CategoryItem[]>([
    {
      categoryId: '001',
      categoryName: '골프',
      iconUrl: '',
      link: '',
    },
    {
      categoryId: '002',
      categoryName: '골프2',
      iconUrl: '',
      link: '',
    },
    {
      categoryId: '003',
      categoryName: '골프3',
      iconUrl: '',
      link: '',
    },
    {
      categoryId: '004',
      categoryName: '골프4',
      iconUrl: '',
      link: '',
    },
    {
      categoryId: '005',
      categoryName: '골프5',
      iconUrl: '',
      link: '',
    },
  ]);

  const categoryButtonClick = useCallback((item: ICategoryButtonListBox.CategoryItem) => {
    // router.push('')
  }, []);

  return (
    <>
      <div className={[
          styles['container']
        ].join(' ')}>
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
                    icon
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
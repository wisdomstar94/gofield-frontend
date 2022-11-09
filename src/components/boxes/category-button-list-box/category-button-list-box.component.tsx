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
      link: '/order/13/product/15/delivery',
    },
    {
      categoryId: '002',
      categoryName: '골프2',
      iconUrl: '',
      link: '/order/13/product/15/exchange-return/reason',
    },
    {
      categoryId: '003',
      categoryName: '골프3',
      iconUrl: '',
      link: '/order/13/product/15/exchange-return/apply?reasonList=2',
    },
    {
      categoryId: '004',
      categoryName: '골프4',
      iconUrl: '',
      link: '/cancel-return-exchange',
    },
    {
      categoryId: '005',
      categoryName: '골프5',
      iconUrl: '',
      link: '',
    },
  ]);

  const categoryButtonClick = useCallback((item: ICategoryButtonListBox.CategoryItem) => {
    router.push(item.link, undefined, { shallow: true });
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
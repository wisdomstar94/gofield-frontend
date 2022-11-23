import Image from "next/image";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import BothSidebox from "../../layouts/both-side-box/both-side-box.component";
import List, { ListItem } from "../../layouts/list/list.component";
import SvgCategoryEtcIcon from "../../svgs/svg-category-etc-icon/svg-category-etc-icon.component";
import styles from "./product-row-item3.component.module.scss";
import { IProductRowItem3 } from "./product-row-item3.interface";

const ProductRowItem3 = (props: IProductRowItem3.Props) => {
  return (
    <>
      <div className={styles['container']}>
        
        <BothSidebox
          __style={{ marginBottom: '8px' }}
          __leftComponentStyle={{ width: 'calc(100% - 30px)' }}
          __leftComponent={<>
            <div className={getClasses([styles['order-status-text'], styles['complete']])}>배송완료</div>
            &nbsp;&nbsp;
            <div className={styles['delicery-date-info-text']}>2022.6.3(월) 도착</div>
          </>}
          __rightComponentStyle={{ width: '30px' }}
          __rightComponent={<>
            <div className={styles['more-button-icon']}>
              <SvgCategoryEtcIcon />
            </div>
          </>} />

        <BothSidebox
          __style={{ alignItems: 'flex-start', alignContent: 'flex-start' }}
          __leftComponentStyle={{ width: '88px' }}
          __leftComponent={<>
            <div className={styles['product-image-box']}>
              <div className="next-image-wrapper">
                <Image
                  src={"https://cdn.pixabay.com/photo/2018/06/12/19/59/football-3471371__480.jpg"}
                  alt="상품 썸네일 이미지"
                  title="상품 썸네일 이미지"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top" />
              </div>
            </div>
          </>}
          __rightComponentStyle={{ width: 'calc(100% - 88px)' }}
          __rightComponent={<>
            <List __width="100%" __direction="vertical" __defaultItemMarginBottom="4px">
              <ListItem>
                <div className={styles['product-name-text']}>페르마 플러스 드라이버 헤드 (9.5도 단품)</div>
              </ListItem>
              <ListItem>
                <div className={styles['product-price-text']}>560,000원</div>
              </ListItem>
              <ListItem>
                <div className={styles['options-text']}>옵션 : {'Black'}</div>
              </ListItem>
              <ListItem __marginBottom="0">
                <div className={styles['options-text']}>수량 : 1</div>
              </ListItem>
            </List>
          </>} />
        
        <div className={styles['']}>
          
        </div>

      </div>
      <div className={styles['border-bottom-box']}></div>
    </>
  );
};

export default ProductRowItem3;
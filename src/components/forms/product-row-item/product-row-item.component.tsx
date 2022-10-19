import styles from "./product-row-item.component.module.scss";
import { IProductRowItem } from "./product-row-item.interface";
import Image from 'next/image';
import List, { ListItem } from "../../layouts/list/list.component";
import StrokeButtons from "../stroke-buttons/stroke-buttons.component";

const ProductRowItem = (props: IProductRowItem.Props) => {
  return (
    <>
      <div className={[
          styles['container']
        ].join(' ')}>
        <div className={[
            styles['product-row-item']
          ].join(' ')}>
          <div className={[
              styles['common-area'], styles['left-area']
            ].join(' ')}>
            <Image
              src="https://cdn.pixabay.com/photo/2012/04/13/00/37/golf-31340__480.png"
              alt="상품 이미지"
              title="상품 이미지"
              layout="fill"
              objectFit="contain" />
          </div>
          <div className={[
              styles['common-area'], styles['right-area']
            ].join(' ')}>
            <List __direction="vertical" __width="100%" __defaultItemMarginBottom="8px">
              <ListItem>
                <span style={{ fontSize: '0.85rem', color: '#1e2238', fontWeight: 'normal', lineHeight: '0.95rem' }}>
                  페르마 플러스 드라이버 헤드 (9.5도 단품) 두줄의경우
                </span>
              </ListItem>
              <ListItem>
                <span style={{ fontSize: '0.75rem', color: '#646f7c', fontWeight: 'normal', lineHeight: '0.75rem' }}>
                  옵션 : Black
                </span>
              </ListItem>
              <ListItem>
                <span style={{ fontSize: '0.75rem', color: '#646f7c', fontWeight: 'normal', lineHeight: '0.75rem' }}>
                  수량 : 1개
                </span>
              </ListItem>
              <ListItem>
                <span style={{ fontSize: '1rem', color: '#1e2238', fontWeight: 'bold', lineHeight: '1rem' }}>
                  51,600원
                </span>
              </ListItem>
            </List>
          </div>
        </div>
        <div className={[
            styles['button-row']
          ].join(' ')}>
          <StrokeButtons
            __buttonItems={[
              {
                textComponent: <>주문/배송 취소</>,
                onClick: () => {

                },
              }
            ]} />
        </div>
      </div>
    </>
  );
};

export default ProductRowItem;
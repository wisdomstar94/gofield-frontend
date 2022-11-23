import Image from "next/image";
import Button from "../../forms/button/button.component";
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
            <div className="text-sm font-bold text-blue-a">배송완료</div>
            &nbsp;&nbsp;
            <div className="text-sm text-black-a font-normal">2022.6.3(월) 도착</div>
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
                <div className="text-sm text-black-a font-normal tracking-tighter break-keep">페르마 플러스 드라이버 헤드 (9.5도 단품)</div>
              </ListItem>
              <ListItem>
                <div className="text-sm text-black-a font-bold tracking-tight">560,000원</div>
              </ListItem>
              <ListItem>
                <div className="text-xs text-black-a tracking-tight">옵션 : {'Black'}</div>
              </ListItem>
              <ListItem __marginBottom="0">
                <div className="text-xs text-black-a tracking-tight">수량 : 1</div>
              </ListItem>
            </List>
          </>} />
        
        <div className="w-full box-border grid grid-cols-2 gap-2 my-2">
          <div>
            <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
              <span className="text-sm font-bold">교환 반품 신청</span>
            </Button>
          </div>
          <div>
            <Button __buttonStyle="gray-solid-radius" __style={{ padding: '8px 10px' }}>
              <span className="text-sm font-bold">배송 조회</span>
            </Button>
          </div>
        </div>

        <div className="w-full box-border">
          <Button __buttonStyle="white-solid-gray-stroke-radius" __style={{ padding: '8px 10px' }}>
            <span className="text-sm font-bold">상품 리뷰 쓰기</span>
          </Button>
        </div>

      </div>
      <div className="block mx-4 h-px bg-gray-a"></div>
    </>
  );
};

export default ProductRowItem3;
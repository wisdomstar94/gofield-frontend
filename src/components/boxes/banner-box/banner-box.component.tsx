import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import styles from "./banner-box.component.module.scss";
import { IBannerBox } from "./banner-box.interface";
import Image from 'next/image';

const BannerBox = (props: IBannerBox.Props) => {
  return (
    <>
      <div className={[
          styles['banner-box'],
        ].join(' ')}>
        <SwiperCustom>
          <div className={[
              styles['banner-item'],
            ].join(' ')}>
            <Image
              src="https://cdn.pixabay.com/photo/2018/02/22/14/58/nature-3173180__480.jpg"
              alt="배너 이미지"
              title="배너 이미지"
              layout="fill"
              draggable={false}
              objectFit="cover" />
          </div>
          <div className={[
              styles['banner-item'],
            ].join(' ')}>
            <Image
              src="https://cdn.pixabay.com/photo/2016/08/03/09/04/universe-1566161__480.jpg"
              alt="배너 이미지"
              title="배너 이미지"
              layout="fill"
              draggable={false}
              objectFit="cover" />
          </div>
          <div className={[
              styles['banner-item'],
            ].join(' ')}>
            <Image
              src="https://cdn.pixabay.com/photo/2016/07/12/19/51/americana-1512910__480.png"
              alt="배너 이미지"
              title="배너 이미지"
              layout="fill"
              draggable={false}
              objectFit="cover" />
          </div>
        </SwiperCustom>
      </div>
    </>
  );
};

export default BannerBox;
import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import styles from "./banner-box.component.module.scss";
import { IBannerBox } from "./banner-box.interface";

const BannerBox = (props: IBannerBox.Props) => {
  return (
    <>
      <div className={[
          styles['banner-box'],
        ].join(' ')}>
        <SwiperCustom>
          <div>
            1
          </div>
        </SwiperCustom>
      </div>
    </>
  );
};

export default BannerBox;
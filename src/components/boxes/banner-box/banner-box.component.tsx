import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import styles from "./banner-box.component.module.scss";
import { IBannerBox } from "./banner-box.interface";
import Image from 'next/image';
import useMainBannerListQuery from "../../../hooks/use-queries/use-main-banner-list.query";
import { useCallback, useRef } from "react";
import { IBanner } from "../../../interfaces/banner/banner.interface";

const BannerBox = (props: IBannerBox.Props) => {
  const mainBannerListQuery = useMainBannerListQuery();

  const swiperChange = useCallback((currentIndex: number, nextCurrentIndex: number) => {
    // console.log('@@swiperChange', { currentIndex, nextCurrentIndex });
  }, []);

  const onItemClick = useCallback((currentIndex: number) => {
    if (mainBannerListQuery.data === undefined) {
      return;
    }
    window.open(mainBannerListQuery.data[currentIndex].linkUrl);
  }, [mainBannerListQuery.data]);

  return (
    <>
      <div className={[
          styles['banner-box'],
        ].join(' ')}>
        <SwiperCustom __style={{ aspectRatio: '16 / 9' }} __onChange={swiperChange} __onItemClick={onItemClick}>
          {
            mainBannerListQuery?.data?.map((item, index) => {
              return (
                <div key={index}
                  className={[
                    styles['banner-item'],
                  ].join(' ')}>
                  <Image
                    priority
                    src={item.thumbnail}
                    alt={item.description}
                    title={item.title}
                    layout="fill"
                    draggable={false}
                    objectFit="cover" />
                </div>      
              );
            })
          }
        </SwiperCustom>
      </div>
    </>
  );
};

export default BannerBox;
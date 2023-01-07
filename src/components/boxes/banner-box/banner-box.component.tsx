import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import styles from "./banner-box.component.module.scss";
import { IBannerBox } from "./banner-box.interface";
import Image from 'next/image';
import useMainBannerListQuery from "../../../hooks/use-queries/use-main-banner-list.query";
import { useCallback, useEffect, useRef, useState } from "react";
import { IBanner } from "../../../interfaces/banner/banner.interface";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { getClasses } from "../../../librarys/string-util/string-util.library";
import ImageBox from "../image-box/image-box.component";
import useImageManager from "../../../hooks/use-image-manager/use-image-manager.hook";
import useClientManager from "../../../hooks/use-client-manager/use-client-manager.hook";

const BannerBox = (props: IBannerBox.Props) => {
  const imageManager = useImageManager();
  const clientManager = useClientManager();

  const [bannerItems, setBannerItems] = useState(props.__bannerItems);
  useEffect(() => { setBannerItems(props.__bannerItems) }, [props.__bannerItems]);

  const swiperChange = useCallback((currentIndex: number, nextCurrentIndex: number) => {
    // console.log('@@swiperChange', { currentIndex, nextCurrentIndex });
  }, []);

  const onItemClick = useCallback((item: IBanner.BannerItem) => {
    // if (mainBannerListQuery.data === undefined) {
    //   return;
    // }
    if (item.linkUrl === null || item.linkUrl === '') {
      return;
    }

    // console.log(`window.open(${item.linkUrl});`);
    console.log('item', item);
    window.open(item.linkUrl);
  }, []);

  return (
    <>
      <div className={getClasses([
          styles['banner-box'],
        ])}>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{ delay: 3000 }}
        >
          {
            bannerItems?.map((item, index) => {
              return (
                <SwiperSlide 
                  key={index}>
                  <div className={styles['banner-item']} onClick={e => onItemClick(item)}>
                    <ImageBox
                      mode="pure"
                      priority={true}
                      src={imageManager.getImageUrl(item.thumbnail, `?s=${clientManager.getWindowSizeContainerWidth()}x${clientManager.getHeightWithWidthRatio(clientManager.getWindowSizeContainerWidth(), 16, 9)}&t=crop&q=100&f=webp`)}
                      alt={item.description ?? '배너 이미지'}
                      title={item.title ?? '배너 이미지'}
                      fill={true}
                      sizes="100% 100%"
                      draggable={false}
                      style={{
                        objectFit: 'cover',
                      }} />
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
    </>
  );
};

export default BannerBox;
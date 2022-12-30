import SwiperCustom from "../../forms/swiper-custom/swiper-custom.component";
import styles from "./banner-box.component.module.scss";
import { IBannerBox } from "./banner-box.interface";
import Image from 'next/image';
import useMainBannerListQuery from "../../../hooks/use-queries/use-main-banner-list.query";
import { useCallback, useRef } from "react";
import { IBanner } from "../../../interfaces/banner/banner.interface";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { getClasses } from "../../../librarys/string-util/string-util.library";

const BannerBox = (props: IBannerBox.Props) => {
  const mainBannerListQuery = useMainBannerListQuery();

  const swiperChange = useCallback((currentIndex: number, nextCurrentIndex: number) => {
    // console.log('@@swiperChange', { currentIndex, nextCurrentIndex });
  }, []);

  const onItemClick = useCallback((item: IBanner.BannerItem) => {
    // if (mainBannerListQuery.data === undefined) {
    //   return;
    // }
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
            mainBannerListQuery?.data?.map((item, index) => {
              return (
                <SwiperSlide 
                  key={index}>
                  <div className={styles['banner-item']} onClick={e => onItemClick(item)}>
                    <Image
                      priority
                      src={item.thumbnail}
                      alt={item.description}
                      title={item.title}
                      fill={true}
                      sizes="100%"
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

        {/* <SwiperCustom 
          __style={{ aspectRatio: '16 / 9' }} 
          __onChange={swiperChange} 
          __onItemClick={onItemClick}
          __slideItemCount={mainBannerListQuery?.data?.length}>
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
        </SwiperCustom> */}
      </div>
    </>
  );
};

export default BannerBox;
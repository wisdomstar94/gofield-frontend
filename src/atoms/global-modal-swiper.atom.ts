import { atom } from "recoil";
import { v1 } from "uuid";
import { IModalSwiper } from "../components/modals/modal-swiper/modal-swiper.interface";

export interface GlobalModalSwiperAtomData {
  swiperItems: IModalSwiper.SwiperItem[];
  activeIndex?: number;
}

export const globalModalSwiperAtom = atom({
  key: `globalModalSwiper${v1()}`,
  default: {
    swiperItems: [],
  } as GlobalModalSwiperAtomData,
});

import React from "react";
import { IBanner } from "../../../interfaces/banner/banner.interface";

export declare namespace IBannerBox {
  export interface Props {
    __bannerItems?: IBanner.BannerItem[];
    children?: React.ReactNode;
  }
}
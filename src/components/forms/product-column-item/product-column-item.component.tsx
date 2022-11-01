import styled from 'styled-components';
import { IProductColumnItem } from "./product-column-item.interface";
import Image from 'next/image';
import { useEffect, useState } from "react";
import SvgHeartOnIcon from "../../svgs/svg-heart-on-icon/svg-heart-on-icon.component";
import SvgHeartOffIcon from "../../svgs/svg-heart-off-icon/svg-heart-off-icon.component";
import { getAddCommaNumberString } from "../../../librarys/string-util/string-util.library";

const ProductColumnItem = (props: IProductColumnItem.Props) => {
  const [isHeart, setIsHeart] = useState(props.__isHeart ?? false);

  useEffect(() => {
    setIsHeart(props.__isHeart ?? false);
  }, [props.__isHeart]);

  const StyleIn = {
    Container: styled.div`
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      position: relative;

      .image-area {
        width: 100%;
        height: 100px;
        position: relative;

        .icon-area {
          position: absolute;
          bottom: 10px;
          right: 10px;
          cursor: pointer;
          padding: 4px;
        }
      }

      .brand-name-area {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        font-size: 0.8rem;
        color: #646f7c;
        font-weight: bold;
        letter-spacing: -0.03rem;
        margin-bottom: 4px;
      }

      .product-name-area {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        font-size: 0.85rem;
        font-weight: normal;
        color: #1e2238;
        letter-spacing: -0.03rem;
        word-break: break-all;
        line-height: 1.09rem;
        margin-bottom: 7px;
      }

      .info-area {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        margin: 0;
        padding: 0;

        .info-area-type-a {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          margin: 0;
          padding: 0;

          > .row {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            margin-bottom: 4px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `,
    OrangeText: styled.div`
      display: inline-flex;
      color: #ff6247;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: -0.05rem;
    `,
    PriceText: styled.div`
      display: inline-flex;
      color: #1e2238;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: -0.05rem;
    `,
    StarText: styled.div`
      color: #646f7c;
      font-size: 0.7rem;
      display: inline-flex;
    `,
    ReviewInfoText: styled.div`
      color: #646f7c;
      font-size: 0.7rem;
      display: inline-flex;
    `,
  };

  return (
    <>
      <StyleIn.Container style={props.__style}>
        <div className="image-area">
          <Image
            src={props.__imageUrl ?? 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__480.jpg'}
            alt="로고 이미지" title="로고 이미지" layout="fill" objectFit="contain" />
          <div className="icon-area">
            { props.__isHeart ? <SvgHeartOnIcon /> : <SvgHeartOffIcon /> }
          </div>
        </div>
        <div className="brand-name-area">
          { props.__brandNameComponent }
        </div>
        <div className="product-name-area">
          { props.__productNameComponent }
        </div>
        <div className="info-area">
          <div className="info-area-type-a">
            <div className="row">
              <StyleIn.OrangeText>
                새상품 최저가 &nbsp;
              </StyleIn.OrangeText>
              <StyleIn.PriceText>
                { getAddCommaNumberString({ numberValue: props.__infoTypeA?.newProductPrice }) }원
              </StyleIn.PriceText>
            </div>
            <div className="row">
              <StyleIn.OrangeText>
                중고상품 최저가 &nbsp;
              </StyleIn.OrangeText>
              <StyleIn.PriceText>
                { getAddCommaNumberString({ numberValue: props.__infoTypeA?.oldProductPrice }) }원
              </StyleIn.PriceText>
            </div>
            <div className="row">
              <StyleIn.StarText>★ &nbsp;</StyleIn.StarText> 
              <StyleIn.ReviewInfoText>4.7 (3)</StyleIn.ReviewInfoText>
            </div>
          </div>
        </div>
      </StyleIn.Container>
    </>
  );
};

export default ProductColumnItem;
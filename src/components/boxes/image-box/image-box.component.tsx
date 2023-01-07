import { useState, useEffect, useCallback, CSSProperties } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./image-box.component.module.scss";
import { IImageBox } from "./image-box.interface";
import NextImage from 'next/image';

const ImageBox = (props: IImageBox.Props) => {
  const [priority, setPriority] = useState(props.priority);
  useEffect(() => { setPriority(props.priority) }, [props.priority]);

  const [src, setSrc] = useState(props.src);
  useEffect(() => { setSrc(props.src) }, [props.src]);

  const [alt, setAlt] = useState(props.alt);
  useEffect(() => { setAlt(props.alt) }, [props.alt]);

  const [title, setTitle] = useState(props.title);
  useEffect(() => { setTitle(props.title) }, [props.title]);

  const [fill, setFill] = useState(props.fill);
  useEffect(() => { setFill(props.fill) }, [props.fill]);

  const [sizes, setSizes] = useState(props.sizes);
  useEffect(() => { setSizes(props.sizes) }, [props.sizes]);

  const [draggable, setDraggable] = useState(props.draggable);
  useEffect(() => { setDraggable(props.draggable) }, [props.draggable]);

  const [style, setStyle] = useState(props.style);
  useEffect(() => { setStyle(props.style) }, [props.style]);

  const [placeholder, setPlaceholder] = useState(props.placeholder);
  useEffect(() => { setPlaceholder(props.placeholder) }, [props.placeholder]);

  const [blurDataURL, setBlurDataURL] = useState(props.blurDataURL);
  useEffect(() => { setBlurDataURL(props.blurDataURL) }, [props.blurDataURL]);

  const [width, setWidth] = useState(props.width);
  useEffect(() => { setWidth(props.width) }, [props.width]);

  const [height, setHeight] = useState(props.height);
  useEffect(() => { setHeight(props.height) }, [props.height]);

  const [mode, setMode] = useState(props.mode);
  useEffect(() => { setMode(props.mode) }, [props.mode]);

  const getWidth = useCallback(() => {
    if (typeof width === 'number') {
      return `${width}px`;
    }

    if (typeof width === 'string') {
      return width;
    }

    if (typeof sizes !== 'string') {
      return '100%';
    }

    const sizesSplit = sizes.split(' ');
    const sizesWidth = sizesSplit[0];

    if (typeof sizesWidth === 'string' && sizesWidth.trim() !== '') {
      return sizesWidth;
    }

    return '100%';
  }, [sizes, width]);

  const getHeight = useCallback(() => {
    if (typeof height === 'number') {
      return `${height}px`;
    }

    if (typeof height === 'string') {
      return height;
    }

    if (typeof sizes !== 'string') {
      return 'auto';
    }

    const sizesSplit = sizes.split(' ');
    const sizesHeight = sizesSplit[1];

    if (typeof sizesHeight === 'string' && sizesHeight.trim() !== '') {
      return sizesHeight;
    }

    return 'auto';
  }, [height, sizes]);

  const getStyle = useCallback(() => {
    const styleObj: CSSProperties = {
      ...style,
      width: getWidth(),
      height: getHeight(),
    };
    return styleObj;
  }, [getHeight, getWidth, style]);

  const getContainerStyle = useCallback(() => {
    const styleObj: CSSProperties = {};

    styleObj.width = getWidth();
    styleObj.height = getHeight();

    return styleObj;
  }, [getHeight, getWidth]);

  const imageClicked = useCallback(() => {
    console.log('?왜.. imageClicked');

    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  }, [props]);

  return (
    <>
      {
        mode === 'pure' ? 
        <div className={getClasses([
          styles['container'],
          draggable ? '' : styles['no-draggable'],
        ])} style={getContainerStyle()}>
          {
            typeof src === 'string' ? 
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={src}
              alt={alt ?? ''}
              title={title ?? ''}
              style={getStyle()}
              loading="lazy"
              onClick={imageClicked}
              /> : 
            <></>
          }
        </div> : 
        <></>
      }

      {
        mode === 'next-image' ? 
        <NextImage
          width={width} 
          height={height} 
          priority={priority}
          src={src ?? ''}
          alt={alt ?? ''}
          title={title}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          draggable={draggable}
          style={style}
          onClick={imageClicked} /> :
        <></>
      }
    </>
  );
};

export default ImageBox;
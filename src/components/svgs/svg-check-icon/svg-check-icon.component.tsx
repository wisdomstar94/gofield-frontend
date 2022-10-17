import { useEffect, useState } from "react";
import { ISvgCheckIcon } from "./svg-check-icon.interface";

const SvgCheckIcon = (props: ISvgCheckIcon.Props) => {
  const [active, setActive] = useState(props.__isActive ?? false);
  useEffect(() => {
    setActive(props.__isActive ?? false);
  }, [props.__isActive])

  return (
    <>
      {
        active ? 
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle stroke="#374553" fill="#374553" cx="8" cy="8" r="7.5"/>
              <path stroke="#FFF" d="m3.727 8 2.856 2.97 5.144-5.602"/>
            </g>
          </svg>
        </>
        :
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#374553" fill="none" fillRule="evenodd">
              <circle cx="8" cy="8" r="7.5"/>
              <path d="m3.727 8 2.856 2.97 5.144-5.602"/>
            </g>
          </svg>
        </>
      }
    </>
  );
};

export default SvgCheckIcon;
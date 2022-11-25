import { useCallback, useEffect, useState } from "react";
import { getClasses } from "../../../librarys/string-util/string-util.library";
import styles from "./switch-toggle-button.component.module.scss";
import { ISwitchToggleButton } from "./switch-toggle-button.interface";

const SwitchToggleButton = (props: ISwitchToggleButton.Props) => {
  const [isAnimation, setIsAnimation] = useState(false);

  const [isActive, setIsActive] = useState(props.__isActive);
  useEffect(() => { setIsActive(props.__isActive) }, [props.__isActive]);

  const switchButtonClick = useCallback(() => {
    setIsActive(isActive === true ? false : true);
  }, [isActive]);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimation(true);
    }, 500);

    () => {
      setIsAnimation(false);
    };
  }, []);

  return (
    <>
      <div 
        className={getClasses([
          styles['container'], 
          isActive === true ? styles['active'] : '', 
          isActive === false ? styles['in-active'] : ''
        ])}
        onClick={switchButtonClick}>
        <div className={getClasses([
          styles['background'],
          isAnimation ? styles['animation'] : '',
        ])}>

        </div>
        <div className={getClasses([
          styles['circle'],
          isAnimation ? styles['animation'] : '',
        ])}>

        </div>
      </div>
    </>
  );
};

export default SwitchToggleButton;
import styles from './empty-row.component.module.scss';
import { IEmptyRow } from "./empty-row.interface";

const EmptyRow = (props: IEmptyRow.Props) => {
  return (
    <>
      <div
        className={[
          styles['empty-row']
        ].join(' ')}
        style={props.__style}></div>
    </>
  );
};

export default EmptyRow;
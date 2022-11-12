import styles from "./article-top-row.component.module.scss";
import { IArticleTopRow } from "./article-top-row.interface";

const ArticleTopRow = (props: IArticleTopRow.Props) => {
  return (
    <>
      <div className={styles['container']}>
        { props.children }
      </div>
    </>
  );
};

export default ArticleTopRow;
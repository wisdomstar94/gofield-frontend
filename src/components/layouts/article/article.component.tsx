import styles from "./article.component.module.scss";
import { IArticle } from "./article.interface";

const Article = (props: IArticle.Props) => {
  return (
    <>
      <article 
        className={[
          styles['article']
        ].join(' ')}
        style={props.__style}>
        { props.children }
      </article>
    </>
  );
};

export default Article;
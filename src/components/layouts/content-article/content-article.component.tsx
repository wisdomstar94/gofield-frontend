import styles from './content-article.component.module.scss';
import { IContentArticle } from './content-article.interface';

const ContentArticle = (props: IContentArticle.Props) => {
  return (
    <>
      <article 
        className={[
          styles['content-article']
        ].join(' ')}
        style={{
          padding: props.__padding,
          marginBottom: props.__marginBottom,
          backgroundColor: props.__bgOpacityZero === true ? 'rgba(255, 255, 255, 0' : undefined,
        }}>
        { props.children }
      </article>
    </>
  );
};

export default ContentArticle;

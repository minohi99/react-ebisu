import styles from '@/styles/post-header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import ConvertDate from './ConvertDate';

type PostHeader = {
  title: string;
  subtitle: string;
  publishDate: string;
};

const PostHeader = ({ title, subtitle, publishDate = '' }: PostHeader) => {
  return (
    <div className={styles.stack}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h1 className={styles.title}>{title}</h1>
      {publishDate && (
        <div className={styles.publishDate}>
          <FontAwesomeIcon icon={faClock} size="lg" color="var(--gray-25)" />

          <ConvertDate publishDate={publishDate} />
        </div>
      )}
    </div>
  );
};

export default PostHeader;

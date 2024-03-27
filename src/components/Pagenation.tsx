import styles from '@/styles/pagenation.module.css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type PagenationProps = {
  prevText?: string;
  prevUrl?: string;
  nextText: string;
  nextUrl: string;
};

const Pagenation = ({
  prevText = '',
  prevUrl = '',
  nextText = '',
  nextUrl = '',
}: PagenationProps) => {
  return (
    <ul className={styles.flexContainer}>
      {prevText && prevUrl && (
        <li className={styles.prev}>
          <Link href={prevUrl} className={styles.iconText}>
            <FontAwesomeIcon icon={faChevronLeft} color="var(--gray-25" />
            <span>{prevText}</span>
          </Link>
        </li>
      )}
      {nextText && nextUrl && (
        <li className={styles.next}>
          <Link href={nextUrl} className={styles.iconText}>
            <span>{nextText}</span>
            <FontAwesomeIcon icon={faChevronRight} color="var(--gray-25" />
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagenation;

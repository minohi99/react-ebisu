import React from 'react';
import styles from '@/styles/post-categories.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

type PostCategoriesProps = {
  categories: Array<{
    name: string;
    slug: string;
  }>;
};

const PostCategories = ({ categories }: PostCategoriesProps) => {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FontAwesomeIcon icon={faFolderOpen} />
        <span className="sr-only">Categories</span>
      </h3>
      <ul className={styles.list}>
        {categories.map(({ slug, name }) => (
          <li key={slug}>
            <Link href={`/blog/category/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostCategories;

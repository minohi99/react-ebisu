import styles from '@/styles/posts.module.css';
import Image from 'next/image';
import Link from 'next/link';

type PostsProps = {
  title: string;
  slug: string;
  eyecatch: {
    url: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
};

const Posts = ({ posts }: { posts: PostsProps[] }) => {
  return (
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug, eyecatch }) => (
        <article className={styles.post} key={slug}>
          <Link href={`/blog/${slug}`}>
            <figure className={styles.postFigure}>
              <Image
                src={eyecatch.url}
                alt={title}
                sizes="(min-width:1152px) 576px, 50vw"
                placeholder="blur"
                fill
                blurDataURL={eyecatch.blurDataURL}
              />
            </figure>
            <h2>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Posts;

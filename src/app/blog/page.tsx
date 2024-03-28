import Hero from '@/components/Hero';
import Link from 'next/link';
import Container from '@/components/Container';
import { getAllPosts } from '@/libs/api';
import Posts from '@/components/Posts';
import { eyecatchLocal } from '@/libs/constants';
import { getPlaiceholder } from 'plaiceholder';
import { getImageBuffer } from '@/libs/getImageBuffer';

export const metadata = {
  title: 'ブログの記事一覧',
  description: 'ブログの記事一覧',
  openGraph: {
    title: 'ブログの記事一覧',
    description: 'ブログの記事一覧',
  },
};

async function Blog() {
  const posts = await getAllPosts();
  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    const imageBuffer = await getImageBuffer(post.eyecatch.url);
    const { base64 } = await getPlaiceholder(imageBuffer);
    post.eyecatch.blurDataURL = base64;
  }

  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />
      <Posts posts={posts} />

      <p>
        <Link href={'/'}>Homeに戻る</Link>
      </p>
    </Container>
  );
}

export default Blog;

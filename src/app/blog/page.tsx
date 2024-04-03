import Hero from '@/components/Hero';
import Link from 'next/link';
import Container from '@/components/Container';
import { getAllPosts } from '@/libs/api';
import Posts from '@/components/Posts';
import { eyecatchLocal } from '@/libs/constants';
import { getPlaiceholder } from 'plaiceholder';
import { getImageBuffer } from '@/libs/getImageBuffer';

import { siteMeta } from '@/libs/constants';
import { openGraphMetadata, twitterMetadata } from '@/libs/baseMetadata';

const { siteTitle, siteUrl } = siteMeta;

const pageTitle = 'ブログ';
const pageDesc = 'ブログの記事一覧';
const ogpTitle = `${pageTitle} | ${siteTitle}`;
const ogpUrl = new URL('/about', siteUrl).toString();

export const metadata = {
  title: pageTitle,
  description: pageDesc,

  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
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

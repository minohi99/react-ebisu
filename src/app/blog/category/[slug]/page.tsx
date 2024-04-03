import Container from '@/components/Container';
import PostHeader from '@/components/PostHeader';
import Posts from '@/components/Posts';
import { getAllCategories, getAllPostsByCategory } from '@/libs/api';
import { eyecatchLocal } from '@/libs/constants';
import { getPlaiceholder } from 'plaiceholder';
import { getImageBuffer } from '@/libs/getImageBuffer';

import { siteMeta } from '@/libs/constants';
const { siteTitle, siteUrl } = siteMeta;

import { openGraphMetadata, twitterMetadata } from '@/libs/baseMetadata';

export async function generateMetadata({ params }) {
  const catSlug = params.slug;

  const allCats = await getAllCategories();
  const cat = allCats.find(({ slug }) => slug === catSlug);

  const pageTitle = cat.name;
  const pageDesc = `${pageTitle}に関する記事`;
  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL(`/blog/category/${catSlug}`, siteUrl).toString();

  const metadata = {
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

  return metadata;
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const allCats = await getAllCategories();
  return allCats.map(({ slug }: { slug: string }) => {
    return { slug: slug };
  });
}

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const catSlug = params.slug;
  const allCats = await getAllCategories();

  const cat = allCats.find(({ slug }: { slug: string }) => slug === catSlug);
  const name = cat.name;

  const posts = await getAllPostsByCategory(cat.id);

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal;
    }
    const ImageBuffer = await getImageBuffer(post.eyecatch.url);
    const { base64 } = await getPlaiceholder(ImageBuffer);
    post.eyecatch.blurDataURL = base64;
  }

  return (
    <Container>
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  );
}

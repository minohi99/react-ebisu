import Container from '@/components/Container';
import PostHeader from '@/components/PostHeader';
import Posts from '@/components/Posts';
import { getAllCategories, getAllPostsByCategory } from '@/libs/api';
import { eyecatchLocal } from '@/libs/constants';
import { getPlaiceholder } from 'plaiceholder';
import { getImageBuffer } from '@/libs/getImageBuffer';

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
  console.log('🚀 ~ allCats:', allCats);

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

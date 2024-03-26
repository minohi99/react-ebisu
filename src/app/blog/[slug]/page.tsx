import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import TwoColumn, {
  TwoColumnMain,
  TwoColumnSidebar,
} from '@/components/TwoColumn';
import { getAllSlugs, getPostBySlug } from '@/libs/api';
import Image from 'next/image';
import ConvertBody from '@/components/ConvertBody';
import PostCategories from '@/components/PostCategories';
import extractText from '@/libs/extract-text';
import React from 'react';
import { eyecatchLocal } from '@/libs/constants';
import { getPlaiceholder } from 'plaiceholder';
import { getImageBuffer } from '@/libs/getImageBuffer';
import { GetStaticPropsContext } from 'next';
import prevNextPost from '@/libs/prev-next-post';
import Pagenation from '@/components/Pagenation';

export const generateMetadata = async () => {
  const post = await getPostBySlug('schedule');
  const description = extractText(post.content);

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: post.siteUrl,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: post.siteUrl,
      type: 'article',
    },
  };
};

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs();
  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  };
}

export default async function Post(context: GetStaticPropsContext) {
  const slug = context.params?.slug;

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }
  const { title, publishDate, eyecatch, content, categories } =
    await getPostBySlug(slug);

  const currentEyecatch = eyecatch ?? eyecatchLocal;
  const imageBuffer = await getImageBuffer(currentEyecatch.url);
  const { base64 } = await getPlaiceholder(imageBuffer);
  const blurDataURL = base64;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost({
    allSlugs,
    currentSlug: slug,
  });
  console.log('🚀 ~ Post ~ prevPost:', prevPost);
  return (
    <React.Fragment>
      <Container>
        <article>
          <PostHeader
            title={title}
            subtitle="Blog Article"
            publishDate={publishDate}
          />

          <Image
            src={currentEyecatch.url}
            alt=""
            width={currentEyecatch.width}
            height={currentEyecatch.height}
            sizes="(min-width:1152px) 1152px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
          />

          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <ConvertBody contentHTML={content} />
              </PostBody>
            </TwoColumnMain>
            <TwoColumnSidebar>
              <PostCategories categories={categories} />
            </TwoColumnSidebar>
          </TwoColumn>
          <Pagenation
            prevText={prevPost.title}
            prevUrl={`/blog/${prevPost.slug}`}
            nextText={nextPost.title}
            nextUrl={`/blog/${nextPost.slug}`}
          />
        </article>
      </Container>
    </React.Fragment>
  );
}

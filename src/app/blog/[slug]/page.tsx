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
import prevNextPost from '@/libs/prev-next-post';
import Pagenation from '@/components/Pagenation';

import { siteMeta } from '@/libs/constants';
const { siteTitle, siteUrl } = siteMeta;

import { openGraphMetadata, twitterMetadata } from '@/libs/baseMetadata';

type ParamsProps = {
  slug: string;
};

export const generateMetadata = async ({ params }: { params: ParamsProps }) => {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  const { title: pageTitle, publishDate: publish, content, categories } = post;

  const pageDesc = extractText(post.content);
  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL(`/blog/${slug}`, siteUrl).toString();

  const metadata = {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: pageDesc,
      url: ogpUrl,
      images: [
        {
          url: eyecatch.url,
          width: eyecatch.width,
          height: eyecatch.height,
        },
      ],
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: pageDesc,
      images: [eyecatch.url],
    },
  };

  return metadata;
};

export const dynamicParams = false;
export async function generateStaticParams() {
  const allSlugs = await getAllSlugs();

  return allSlugs.map(({ slug }) => {
    return { slug: slug };
  });
}

export default async function Post({ params }: { params: ParamsProps }) {
  const slug = params.slug;

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
            key={currentEyecatch.url}
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

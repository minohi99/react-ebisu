import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import TwoColumn, {
  TwoColumnMain,
  TwoColumnSidebar,
} from '@/components/TwoColumn';
import { getPostBySlug } from '@/libs/api';
import Image from 'next/image';
import ConvertBody from '@/components/ConvertBody';
import PostCategories from '@/components/PostCategories';
import extractText from '@/libs/extract-text';
import React from 'react';

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

export default async function Schedule() {
  const { title, publishDate, eyecatch, content, categories } =
    await getPostBySlug('schedule');

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
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width:1152px) 1152px, 100vw"
            priority
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
        </article>
      </Container>
    </React.Fragment>
  );
}

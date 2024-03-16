import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import TwoColumn, {
  TwoColumnMain,
  TwoColumnSidebar,
} from '@/components/TwoColumn';
import { getPostBySlug } from '@/lib/api';
import Image from 'next/image';
import ConvertBody from '@/components/ConvertBody';
import PostCategories from '@/components/PostCategories';

export default async function Schedule() {
  const { title, publishDate, eyecatch, content, categories } =
    await getPostBySlug('schedule');

  return (
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
            {/* <PostBody>{content}</PostBody> */}
            <PostBody>
              <ConvertBody contentHTML={content} />
              {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  );
}

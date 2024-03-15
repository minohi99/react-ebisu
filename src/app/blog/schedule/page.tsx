import Container from '@/components/Container';
import PostBody from '@/components/PostBody';
import PostHeader from '@/components/PostHeader';
import TwoColumn, {
  TwoColumnMain,
  TwoColumnSidebar,
} from '@/components/TwoColumn';
import { getPostBySlug } from '@/lib/api';
import Image from 'next/image';
import parse from 'html-react-parser';
import ConvertBody from '@/components/ConvertBody';

export default async function Schedule() {
  const { title, publishDate, eyecatch, content } =
    await getPostBySlug('schedule');
  console.log('🚀 ~ Schedule ~ eyecatch:', eyecatch);

  return (
    <Container>
      <article>
        <PostHeader
          title={title}
          subtitle="Blog Article"
          publishDate={publishDate}
        />
        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            layout="responsive"
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width:1152px) 1152px, 100vw"
            priority
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            {/* <PostBody>{content}</PostBody> */}
            <PostBody>
              <ConvertBody contentHTML={content} />
              {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar> </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  );
}

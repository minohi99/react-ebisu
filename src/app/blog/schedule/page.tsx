import Container from '@/components/Container';
import PostHeader from '@/components/PostHeader';
import { getPostBySlug } from '@/lib/api';

export default async function Schedule() {
  const { title, publishDate } = await getPostBySlug('schedule');
  return (
    <Container>
      <article>
        <PostHeader
          title={title}
          subtitle="Blog Article"
          publishDate={publishDate}
        />
      </article>
    </Container>
  );
}

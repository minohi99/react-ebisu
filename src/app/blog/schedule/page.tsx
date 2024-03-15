import Container from '@/components/Container';
import { getPostBySlug } from '@/lib/api';

export default async function Schedule() {
  const { title } = await getPostBySlug('schedule');
  return (
    <Container>
      <h1>{title}</h1>
      {/* 追加のコンテンツ表示 */}
    </Container>
  );
}

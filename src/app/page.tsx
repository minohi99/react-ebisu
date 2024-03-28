import React from 'react';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Posts from '@/components/Posts';
import Pagenation from '@/components/Pagenation';
import { getAllPosts } from '@/libs/api';
import { eyecatchLocal } from '@/libs/constants';
import { getImageBuffer } from '@/libs/getImageBuffer';
import { getPlaiceholder } from 'plaiceholder';

export default async function Home() {
  const posts = await getAllPosts(4);
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
      <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />

      <Posts posts={posts} />
      <Pagenation nextUrl="/blog" nextText="More Posts" />
    </Container>
  );
}

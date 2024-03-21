import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN!,
  apiKey: process.env.API_KEY!,
});

export async function getPostBySlug(slug: string) {
  try {
    const post = await client.getList({
      customRequestInit: {
        cache: 'force-cache',
      },
      endpoint: 'blogs',
      queries: { filters: `slug[equals]${slug}` },
    });
    console.log(post);
    return post.contents[0];
  } catch (err) {
    console.log(err);
  }
}

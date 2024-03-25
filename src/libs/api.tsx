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
    return post.contents[0];
  } catch (err) {}
}

interface SlugObject {
  slug: string;
}

export async function getAllSlugs(limit = 100): Promise<SlugObject[]> {
  try {
    const slugs = await client.get({
      endpoint: 'blogs',
      queries: { fields: 'title,slug', orders: '-publishDate', limit: limit },
    });
    // console.log(slugs.contents);
    return slugs.contents;
  } catch (err) {
    console.log('~~ getAllSlugs ~~');
    console.log(err);
    return [];
  }
}

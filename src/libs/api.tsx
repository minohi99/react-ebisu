import { SlugObject } from '@/app/types/SlugObject';
import { createClient } from 'microcms-js-sdk';

/**
 * microCMSのクライアントを作成
 */
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN!,
  apiKey: process.env.API_KEY!,
});

/**
 * 指定されたスラッグに一致する投稿を取得
 *
 * @param {string} slug - 取得したい投稿のスラグ。
 * @returns {Promise<any>} 指定されたスラグに一致する投稿オブジェクトを返します。
 */
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

/**
 * 全てのスラッグを取得
 *
 * @param {number} [limit=100] - 取得するスラグの最大数。
 * @returns {Promise<SlugObject[]>} スラグオブジェクトの配列を返します。
 */
export async function getAllSlugs(limit = 100): Promise<SlugObject[]> {
  try {
    const slugs = await client.get({
      endpoint: 'blogs',
      queries: { fields: 'title,slug', orders: '-publishDate', limit: limit },
    });
    return slugs.contents;
  } catch (err) {
    console.log('~~ getAllSlugs ~~');
    console.log(err);
    return [];
  }
}

export async function getAllPosts(limit = 100) {
  try {
    const posts = await client.get({
      endpoint: 'blogs',
      queries: {
        fields: 'title,slug,eyecatch',
        orders: 'publishDate',
        limit: limit,
      },
    });
    return posts.contents;
  } catch (error) {
    console.log('🚀 ~ getAllPosts ~ error:', error);
  }
}

import { getAllCategories, getAllSlugs } from '@/libs/api';

type Category = {
  slug: string;
};

export default async function sitemap() {
  const siteUrl = 'http://localhost:3000';
  const posts = await getAllSlugs();
  const postFields = posts.map((post) => {
    return {
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });

  const cats = await getAllCategories();
  const catFields = cats.map((cat: Category) => {
    return {
      url: new URL(`/blog/category/${cat.slug}`, siteUrl).toString(),
      lastModified: new Date(),
    };
  });
  return [
    {
      url: new URL(siteUrl).toString(),
      lastModified: new Date(),
    },
    { url: new URL('/about', siteUrl).toString(), lastModified: new Date() },
    ...postFields,
    ...catFields,
  ];
}

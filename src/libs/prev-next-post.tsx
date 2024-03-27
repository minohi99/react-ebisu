import { SlugObject } from '@/app/types/SlugObject';

type prevNextPostProps = {
  allSlugs: SlugObject[];
  currentSlug: string;
};

const prevNextPost = ({ allSlugs, currentSlug }: prevNextPostProps) => {
  const numberOfPosts = allSlugs.length;
  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug);

  const prevPost = index === 0 ? { title: '', slug: '' } : allSlugs[index - 1];

  const nextPost =
    index + 1 === numberOfPosts ? { title: '', slug: '' } : allSlugs[index + 1];

  return [prevPost, nextPost];
};

export default prevNextPost;

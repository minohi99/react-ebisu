import Hero from "@/components/Hero";
import Link from "next/link";
import Container from "@/components/Container";

export const metadata = {
  title: "ブログの記事一覧",
  description: "ブログの記事一覧",
  openGraph: {
    title: "ブログの記事一覧",
    description: "ブログの記事一覧",
  },
};

const Blog = () => {
  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />
      <p>
        <Link href={"/"}>Homeに戻る</Link>
      </p>
    </Container>
  );
};

export default Blog;

import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNews } from "@/lib/news";
import { ArticleClient } from "./ArticleClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getNewsBySlug(resolvedParams.slug);
  
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | MobileHub Pro News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: "article",
      authors: [article.author.name],
      publishedTime: article.publishedAt,
    }
  };
}

// Pre-render the top news articles at build time
export async function generateStaticParams() {
  const news = getAllNews();
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getNewsBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
}

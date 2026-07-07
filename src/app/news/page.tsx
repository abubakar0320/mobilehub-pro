import { Metadata } from "next";
import { NewsClient } from "./NewsClient";
import { getAllNews, getTrendingNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Latest Mobile News, Reviews & Leaks | MobileHub Pro",
  description: "Stay up to date with the latest smartphone launches, in-depth reviews, rumors, and tech deals.",
};

export default function NewsPage() {
  const allNews = getAllNews();
  const topStory = allNews[0];
  const trending = getTrendingNews(5);

  return <NewsClient topStory={topStory} trending={trending} />;
}

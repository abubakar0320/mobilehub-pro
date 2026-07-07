import { NewsArticle } from "@/types/news";
import Link from "next/link";
import Image from "next/image";

export function TrendingSidebar({ articles }: { articles: NewsArticle[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white border-2 border-transparent [border-image:linear-gradient(to_bottom,#ec4899,#8b5cf6)_1] dark:bg-slate-800 rounded-[20px] p-[28px] sticky top-[140px] shadow-lg shadow-fuchsia-100/50">
      <div className="flex items-center gap-3 mb-[24px] pb-[16px] border-b-[2px] border-fuchsia-100 dark:border-slate-700">
        <div className="w-[10px] h-[10px] rounded-full bg-rose-500 animate-pulse shadow-sm shadow-rose-200"></div>
        <h2 className="text-[18px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-600 uppercase tracking-widest">Trending Now</h2>
      </div>

      <div className="flex flex-col gap-[20px]">
        {articles.map((article, index) => (
          <Link href={`/news/${article.slug}`} key={article._id} className="group flex gap-[16px] items-start">
            <div className="text-[32px] font-[900] text-zinc-200 dark:text-slate-700 leading-none mt-[-4px] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-[800] text-zinc-800 dark:text-slate-100 leading-[1.4] line-clamp-3 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors mb-[6px] tracking-tight">
                {article.title}
              </h3>
              <div className="text-[12px] font-[700] bg-zinc-100 inline-block px-2 py-0.5 rounded-md text-zinc-500 dark:text-slate-500">
                {article.readTime} min read · {Math.floor(article.views / 1000)}K views
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

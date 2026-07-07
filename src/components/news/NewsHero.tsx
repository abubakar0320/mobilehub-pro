import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import { formatDistanceToNow } from "date-fns";

export function NewsHero({ article }: { article?: NewsArticle }) {
  if (!article) return null;

  return (
    <Link href={`/news/${article.slug}`} className="block w-full group relative overflow-hidden rounded-[16px] md:rounded-[24px] aspect-auto md:aspect-[2/1] min-h-[400px]">
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      
      <Image 
        src={article.coverImage} 
        alt={article.title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        priority
      />

      <div className="absolute bottom-0 left-0 right-0 p-[24px] md:p-[40px] z-20 flex flex-col md:flex-row md:items-end justify-between gap-[20px]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white text-[11px] font-[700] uppercase tracking-widest px-[12px] py-[6px] rounded-[6px] mb-[16px]">
            {article.category}
          </div>
          <h1 className="text-[28px] md:text-[42px] font-[800] text-white leading-[1.1] mb-[12px] tracking-tight">
            {article.title}
          </h1>
          <p className="text-[15px] md:text-[17px] text-slate-200 line-clamp-2 md:line-clamp-3 leading-[1.6]">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-[12px] flex-shrink-0">
          <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden border-2 border-white/20">
            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-[600] text-white">{article.author.name}</span>
            <span className="text-[11px] text-slate-300">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })} · {article.readTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

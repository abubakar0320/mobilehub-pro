import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import { formatDistanceToNow } from "date-fns";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="flex flex-col group bg-white border-2 border-zinc-100 dark:bg-slate-800 dark:border-slate-700 rounded-[20px] overflow-hidden hover:border-fuchsia-300 dark:hover:border-fuchsia-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-fuchsia-100/50">
      <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
        <Image 
          src={article.thumbnail} 
          alt={article.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-[12px] left-[12px] bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[10px] font-[900] uppercase tracking-widest px-[12px] py-[6px] rounded-[8px] shadow-sm">
          {article.category}
        </div>
      </div>
      
      <div className="p-[20px] flex flex-col flex-1">
        <h3 className="text-[17px] font-[900] text-zinc-900 dark:text-slate-100 leading-[1.3] mb-[8px] line-clamp-3 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors tracking-tight">
          {article.title}
        </h3>
        
        <p className="text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-[1.5] mb-[16px] flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-[16px] border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-[8px]">
            <div className="relative h-[24px] w-[24px] rounded-full overflow-hidden">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
            </div>
            <span className="text-[12px] font-[500] text-slate-900 dark:text-slate-100">{article.author.name}</span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {formatDistanceToNow(new Date(article.publishedAt))} ago
          </span>
        </div>
      </div>
    </Link>
  );
}

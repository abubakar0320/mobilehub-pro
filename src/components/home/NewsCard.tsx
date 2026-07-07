import Image from "next/image";
import Link from "next/link";

export interface NewsArticle {
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  image: string;
  time: string;
  slug?: string;
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden group cursor-pointer">
      <div className="relative h-[140px] w-full">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ color: article.categoryColor }}>
          {article.category}
        </div>
      </div>
      
      <div className="p-[16px] flex flex-col h-[180px]">
        <h3 className="text-[16px] font-[600] text-[#0F172A] leading-snug line-clamp-2 mb-2 group-hover:text-[#2563EB] transition-colors">
          {article.title}
        </h3>
        <p className="text-[13px] text-[#64748B] line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto text-[13px] text-[#94A3B8]">
          <span>{article.time}</span>
          <Link href={article.slug ? `/news/${article.slug}` : "/news"} className="font-medium text-[#2563EB] hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}

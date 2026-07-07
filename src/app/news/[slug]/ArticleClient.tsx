"use client";

import { NewsArticle } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Share2, BookmarkPlus, Link as LinkIcon, MessageCircle } from "lucide-react";

export function ArticleClient({ article }: { article: NewsArticle }) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    window.alert("Article link copied to clipboard!");
  };

  return (
    <article className="bg-white min-h-screen pb-[100px]">
      
      {/* Top Navigation */}
      <div className="sticky top-[60px] z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-[800px] mx-auto px-[24px] h-[56px] flex items-center justify-between">
          <Link href="/news" className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] text-[13px] font-[500] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="text-[#64748B] hover:text-[#2563EB] transition-colors" title="Save article">
              <BookmarkPlus className="h-5 w-5" />
            </button>
            <button onClick={handleShare} className="text-[#64748B] hover:text-[#2563EB] transition-colors" title="Share">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-[800px] mx-auto px-[24px] pt-[60px] pb-[40px]">
        <div className="flex items-center gap-[12px] mb-[24px]">
          <span className="inline-flex items-center justify-center bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-[700] uppercase tracking-widest px-[12px] py-[4px] rounded-[4px]">
            {article.category}
          </span>
          <span className="text-[13px] text-[#94A3B8]">
            {formatDistanceToNow(new Date(article.publishedAt))} ago
          </span>
        </div>

        <h1 className="text-[32px] md:text-[48px] font-[800] text-[#0F172A] leading-[1.1] tracking-tight mb-[24px]">
          {article.title}
        </h1>

        <p className="text-[18px] md:text-[22px] text-[#64748B] leading-[1.6] mb-[32px]">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-[16px] py-[16px] border-y border-[#F1F5F9]">
          <div className="relative h-[48px] w-[48px] rounded-full overflow-hidden">
            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-[700] text-[#0F172A]">{article.author.name}</span>
            <span className="text-[13px] text-[#64748B]">{article.author.role}</span>
          </div>
          
          <div className="ml-auto text-[13px] text-[#94A3B8] hidden sm:block">
            {article.readTime} min read · {Math.floor(article.views / 1000)}K views
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-[1000px] mx-auto px-[24px] mb-[60px]">
        <div className="relative aspect-[16/9] w-full rounded-[16px] md:rounded-[24px] overflow-hidden bg-[#F8FAFC]">
          <Image 
            src={article.coverImage} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[680px] mx-auto px-[24px]">
        {/* We use a prose-like custom class for beautifully formatted HTML content */}
        <div 
          className="article-content prose prose-lg prose-slate max-w-none 
          prose-headings:font-[800] prose-headings:tracking-tight prose-headings:text-[#0F172A]
          prose-p:text-[#334155] prose-p:leading-[1.8] prose-p:text-[18px]
          prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-[16px] prose-strong:text-[#0F172A] prose-strong:font-[700]"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        {/* Tags */}
        <div className="mt-[60px] pt-[32px] border-t border-[#E2E8F0] flex flex-wrap gap-[8px]">
          <span className="text-[13px] font-[600] text-[#0F172A] mr-[8px] self-center">Tags:</span>
          {article.tags.map(tag => (
            <Link key={tag} href={`/news?query=${encodeURIComponent(tag)}`} className="bg-[#F1F5F9] text-[#475569] text-[12px] font-[500] px-[12px] py-[6px] rounded-full hover:bg-[#E2E8F0] transition-colors">
              #{tag}
            </Link>
          ))}
        </div>

        {/* Share Footer */}
        <div className="mt-[40px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-[24px] flex flex-col items-center text-center">
          <h3 className="text-[16px] font-[700] text-[#0F172A] mb-[16px]">Share this story</h3>
          <div className="flex gap-[12px]">
            <button onClick={handleShare} className="h-[40px] w-[40px] rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB] flex items-center justify-center transition-colors" title="Share via Message">
              <MessageCircle className="h-5 w-5" />
            </button>
            <button onClick={handleShare} className="h-[40px] w-[40px] rounded-full bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#0F172A] flex items-center justify-center transition-colors" title="Copy Link">
              <LinkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

    </article>
  );
}

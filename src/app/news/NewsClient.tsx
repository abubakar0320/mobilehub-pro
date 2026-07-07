"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/phones"; // reusing fetcher
import { NewsArticle } from "@/types/news";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsFilterBar } from "@/components/news/NewsFilterBar";
import { TrendingSidebar } from "@/components/news/TrendingSidebar";
import { NewsCard } from "@/components/news/NewsCard";
import { Loader2 } from "lucide-react";

export function NewsClient({ topStory, trending }: { topStory: NewsArticle, trending: NewsArticle[] }) {
  const [category, setCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const limit = 6;

  const url = `/api/news?category=${category}&query=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`;
  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setPage(1);
  };

  const articles: NewsArticle[] = data?.news || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-[80px]">
      
      {/* Page Title */}
      <div className="text-center pt-[40px] px-[24px] pb-[32px]">
        <h1 className="text-[36px] md:text-[44px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-[8px] drop-shadow-sm tracking-tight">Mobile News Hub</h1>
        <p className="text-[15px] font-[700] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">The latest launches, deep-dive reviews, and exclusive leaks.</p>
      </div>

      <div className="max-w-7xl mx-auto px-[24px] mb-[40px]">
        {searchQuery === '' && category === 'All' && <NewsHero article={topStory} />}
      </div>

      <NewsFilterBar 
        activeCategory={category} 
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="max-w-7xl mx-auto px-[24px] pt-[40px]">
        <div className="flex flex-col lg:flex-row gap-[32px]">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <h2 className="text-[24px] font-[900] text-zinc-900 dark:text-zinc-100 mb-[24px] pb-[12px] border-b-[3px] border-fuchsia-500 dark:border-fuchsia-500 inline-block">
              {searchQuery ? `Search results for "${searchQuery}"` : category === 'All' ? 'Latest Stories' : `${category} News`}
            </h2>

            {isLoading && articles.length === 0 ? (
              <div className="flex justify-center py-[60px]">
                <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-500 animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-[60px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[16px]">
                <p className="text-slate-500 dark:text-slate-400 text-[15px]">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] md:gap-[20px]">
                {articles.map(article => (
                  <NewsCard key={article._id} article={article} />
                ))}
              </div>
            )}

            {data?.hasMore && (
              <div className="mt-[40px] flex justify-center">
                <button 
                  onClick={() => setPage(p => p + 1)}
                  className="px-[32px] h-[48px] bg-white dark:bg-zinc-800 border-2 border-fuchsia-200 dark:border-zinc-700 text-fuchsia-600 dark:text-zinc-100 text-[14px] font-[800] rounded-full hover:bg-fuchsia-50 dark:hover:border-zinc-500 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-fuchsia-200"
                >
                  Load more articles
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <TrendingSidebar articles={trending} />
          </div>

        </div>
      </div>

    </div>
  );
}

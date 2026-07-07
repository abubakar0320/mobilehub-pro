import { Search } from "lucide-react";
import { NewsCategory } from "@/types/news";

const CATEGORIES: (NewsCategory | 'All')[] = ['All', 'Launches', 'Leaks', 'Reviews', 'Updates', 'Deals', 'AI'];

export function NewsFilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  return (
    <div className="sticky top-[60px] z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-[12px] px-[24px]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-[16px]">
        
        {/* Categories (Scrollable) */}
        <div className="flex w-full sm:w-auto overflow-x-auto hide-scrollbar gap-[8px]">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex-shrink-0 text-[13px] font-[500] px-[16px] py-[8px] rounded-full transition-colors border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[260px] flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[13px] rounded-full pl-10 pr-4 py-[8px] focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-all"
            placeholder="Search news..."
          />
        </div>

      </div>
    </div>
  );
}

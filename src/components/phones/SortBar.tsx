import { LayoutGrid, List } from "lucide-react";

export function SortBar({
  totalCount,
  currentSort,
  currentView,
  setSort,
  setView
}: {
  totalCount: number,
  currentSort: string,
  currentView: 'grid' | 'list',
  setSort: (val: string) => void,
  setView: (val: 'grid' | 'list') => void
}) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 h-[52px] px-[24px] flex items-center justify-between">
      
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-zinc-400 dark:text-zinc-500">Home</span>
        <span className="text-zinc-400 dark:text-zinc-500">&gt;</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-semibold">All Phones</span>
      </div>

      <div className="flex items-center gap-[12px]">
        <span className="text-[13px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
          {totalCount.toLocaleString()} phones found
        </span>

        <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 rounded-[8px] h-[36px] px-[12px] transition-colors">
          <svg className="h-4 w-4 text-zinc-500 hidden sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          <span className="text-[13px] text-zinc-500 dark:text-zinc-400">Sort by:</span>
          <select 
            value={currentSort}
            onChange={(e) => setSort(e.target.value)}
            className="text-[13px] text-zinc-600 dark:text-zinc-400 outline-none bg-transparent font-medium cursor-pointer"
          >
            <option value="popularity">Popularity</option>
            <option value="newest">Newest first</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-1 border-2 border-violet-100 dark:border-violet-900 rounded-[10px] p-1 bg-white dark:bg-zinc-800 shadow-sm">
          <button 
            onClick={() => setView('grid')}
            className={`p-1.5 rounded-[6px] transition-all ${currentView === 'grid' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md' : 'bg-transparent text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50'}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-1.5 rounded-[6px] transition-all ${currentView === 'list' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md' : 'bg-transparent text-zinc-400 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

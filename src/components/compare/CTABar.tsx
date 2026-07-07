import { ArrowLeft, Bookmark, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 z-50 flex items-center justify-between px-[24px]">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        
        <Link 
          href="/phones"
          className="flex items-center gap-2 text-[13px] font-[500] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to search</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-[16px] h-[40px] rounded-[8px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[13px] font-[500] hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Save comparison</span>
          </button>
          <button className="flex items-center gap-2 px-[20px] h-[40px] rounded-[8px] bg-violet-600 dark:bg-violet-500 text-white text-[13px] font-[600] hover:bg-violet-700 dark:hover:bg-violet-400 transition-colors shadow-sm">
            <ShoppingBag className="h-4 w-4" />
            <span>View deals & buy</span>
          </button>
        </div>

      </div>
    </div>
  );
}

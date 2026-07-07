import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComparePhone } from "@/hooks/useCompare";

export function CompareTray({
  compareList,
  onRemove
}: {
  compareList: ComparePhone[],
  onRemove: (id: string) => void
}) {
  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 z-50 h-[80px]"
        >
          <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-between">
            
            <div className="hidden lg:block w-[150px]">
              <span className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">Compare phones</span>
              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">{compareList.length} of 4 selected</div>
            </div>

            <div className="flex-1 flex justify-center gap-[12px]">
              {Array.from({ length: 4 }).map((_, i) => {
                const phone = compareList[i];
                if (phone) {
                  return (
                    <div key={phone.id} className="w-[60px] h-[60px] sm:w-[120px] bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-[8px] flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 p-1 sm:p-2 relative group">
                      <button 
                        onClick={() => onRemove(phone.id)}
                        className="absolute -top-2 -right-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full p-0.5 text-violet-400 hover:text-violet-700 dark:text-violet-500 dark:hover:text-violet-300 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="h-6 w-6 sm:h-10 sm:w-10 relative flex-shrink-0">
                        <Image src={phone.image} alt={phone.name} fill className="object-contain" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-medium text-violet-700 dark:text-violet-300 truncate w-full text-center sm:text-left hidden sm:block">
                        {phone.name}
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={`empty-${i}`} className="w-[60px] h-[60px] sm:w-[120px] bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-[8px] flex flex-col items-center justify-center gap-1">
                    <Plus className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:block">Add phone</span>
                  </div>
                );
              })}
            </div>

            <div className="w-[120px] sm:w-[150px] flex justify-end">
              <Link 
                href={`/compare?phones=${compareList.map(p => p.id).join(',')}`}
                className={`px-4 sm:px-6 h-[40px] rounded-[8px] text-[13px] font-[600] flex items-center transition-all ${
                  compareList.length > 1 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:from-violet-700 hover:to-indigo-600' 
                    : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 pointer-events-none'
                }`}
              >
                Compare {compareList.length > 1 && 'now'} →
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

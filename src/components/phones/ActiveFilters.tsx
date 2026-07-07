import { X } from "lucide-react";

export function ActiveFilters({
  filters,
  toggleArrayFilter,
  setFilter,
  clearFilters
}: {
  filters: any,
  toggleArrayFilter: (k: string, v: string) => void,
  setFilter: (k: string, v: string) => void,
  clearFilters: () => void
}) {
  const activeChips: { key: string, val: string, label: string }[] = [];

  filters.brand.forEach((b: string) => activeChips.push({ key: 'brand', val: b, label: b }));
  filters.ram.forEach((r: string) => activeChips.push({ key: 'ram', val: r, label: `${r} GB RAM` }));
  filters.storage.forEach((s: string) => activeChips.push({ key: 'storage', val: s, label: s === "1024" ? "1 TB Storage" : `${s} GB Storage` }));
  
  if (filters.price_min) activeChips.push({ key: 'price_min', val: filters.price_min, label: `Min $${filters.price_min}` });
  if (filters.price_max) activeChips.push({ key: 'price_max', val: filters.price_max, label: `Max $${filters.price_max}` });

  if (activeChips.length === 0) return null;

  return (
    <div className="flex items-center overflow-x-auto hide-scrollbar gap-2 py-4 mb-2">
      {activeChips.map(chip => (
        <div key={`${chip.key}-${chip.val}`} className="flex items-center gap-1 bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 rounded-full px-[10px] py-[4px] flex-shrink-0 animate-in zoom-in-95 duration-200">
          <span className="text-[12px] text-violet-700 dark:text-violet-300 capitalize">{chip.label}</span>
          <button 
            onClick={() => {
              if (['brand', 'ram', 'storage'].includes(chip.key)) {
                toggleArrayFilter(chip.key, chip.val);
              } else {
                setFilter(chip.key, '');
              }
            }}
            className="text-violet-400 dark:text-violet-500 hover:text-violet-700 dark:hover:text-violet-300 ml-1"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <button 
        onClick={clearFilters}
        className="text-[12px] text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-full px-[10px] py-[4px] flex-shrink-0 transition-colors ml-2 font-medium"
      >
        Clear all filters
      </button>
    </div>
  );
}

import { FilterSection } from "./FilterSection";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { useState } from "react";

export function FilterSidebar({
  filters,
  toggleArrayFilter,
  setFilter,
  setFilters,
  clearFilters
}: {
  filters: any,
  toggleArrayFilter: (k: string, v: string) => void,
  setFilter: (k: string, v: string) => void,
  setFilters?: (f: Record<string, string>) => void,
  clearFilters: () => void
}) {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const allBrands = [
    { name: "Apple", count: 284 },
    { name: "Samsung", count: 612 },
    { name: "Xiaomi", count: 498 },
    { name: "OnePlus", count: 187 },
    { name: "Google", count: 92 },
    { name: "Vivo", count: 341 },
    { name: "Oppo", count: 278 },
    { name: "Motorola", count: 156 },
    { name: "Huawei", count: 211 },
    { name: "Honor", count: 189 },
    { name: "Realme", count: 320 },
    { name: "Asus", count: 85 },
    { name: "Sony", count: 64 },
    { name: "Nokia", count: 120 },
    { name: "Nothing", count: 24 },
    { name: "Infinix", count: 210 },
    { name: "Tecno", count: 198 },
    { name: "ZTE", count: 75 },
    { name: "Meizu", count: 45 }
  ];

  const visibleBrands = showAllBrands ? allBrands : allBrands.slice(0, 8);

  const rams = ["2", "4", "6", "8", "12", "16"];
  const storages = ["32", "64", "128", "256", "512", "1024"];

  return (
    <div className="w-[260px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto hide-scrollbar flex flex-col hidden lg:flex">
      <div className="p-[20px] px-[16px] flex-1">
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[16px] font-[600] text-zinc-900 dark:text-zinc-100">Filters</h2>
          <button onClick={clearFilters} className="text-[13px] text-rose-600 dark:text-rose-400 hover:underline">Clear all</button>
        </div>

        <FilterSection title="Brand">
          <div className="space-y-2">
            {visibleBrands.map(b => (
              <label key={b.name} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filters.brand.includes(b.name.toLowerCase())}
                  onChange={() => toggleArrayFilter('brand', b.name.toLowerCase())}
                  className="rounded-[4px] border-zinc-300 dark:border-zinc-700 text-violet-600 dark:text-violet-500 focus:ring-violet-600 dark:focus:ring-violet-500 accent-violet-600 dark:accent-violet-500 w-4 h-4 cursor-pointer" 
                />
                <span className="text-[14px] text-zinc-700 dark:text-zinc-300 flex-1 group-hover:text-violet-600 dark:group-hover:text-violet-500 transition-colors">{b.name}</span>
                <span className="text-[12px] text-zinc-400 dark:text-zinc-500">({b.count})</span>
              </label>
            ))}
            
            {!showAllBrands ? (
              <button 
                onClick={() => setShowAllBrands(true)} 
                className="text-[13px] text-violet-600 dark:text-violet-500 font-medium pt-1 hover:underline"
              >
                Show {allBrands.length - 8} more →
              </button>
            ) : (
              <button 
                onClick={() => setShowAllBrands(false)} 
                className="text-[13px] text-violet-600 dark:text-violet-500 font-medium pt-1 hover:underline"
              >
                Show less ←
              </button>
            )}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <PriceRangeSlider 
            initialMin={filters.price_min} 
            initialMax={filters.price_max} 
            onChange={(min, max) => {
              if (setFilters) {
                setFilters({ price_min: min, price_max: max });
              } else {
                // Fallback if setFilters not provided
                setFilter('price_min', min);
                setTimeout(() => setFilter('price_max', max), 50); 
              }
            }} 
          />
        </FilterSection>

        <FilterSection title="RAM (GB)">
          <div className="flex flex-wrap gap-2">
            {rams.map(r => {
              const active = filters.ram.includes(r);
              return (
                <button 
                  key={r}
                  onClick={() => toggleArrayFilter('ram', r)}
                  className={`text-[12px] px-3 py-1.5 rounded-[999px] border transition-colors ${
                    active ? 'bg-violet-600 dark:bg-violet-500 border-violet-600 dark:border-violet-500 text-white' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-violet-400 dark:hover:border-violet-500'
                  }`}
                >
                  {r} GB
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Storage (GB)">
          <div className="flex flex-wrap gap-2">
            {storages.map(s => {
              const active = filters.storage.includes(s);
              const label = s === "1024" ? "1 TB" : `${s} GB`;
              return (
                <button 
                  key={s}
                  onClick={() => toggleArrayFilter('storage', s)}
                  className={`text-[12px] px-3 py-1.5 rounded-[999px] border transition-colors ${
                    active ? 'bg-violet-600 dark:bg-violet-500 border-violet-600 dark:border-violet-500 text-white' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-violet-400 dark:hover:border-violet-500'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FilterSection>

      </div>

      <div className="sticky bottom-0 bg-white dark:bg-zinc-900 p-4 border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-4px_10px_rgba(0,0,0,0.02)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-violet-600 dark:bg-violet-500 text-white h-[40px] rounded-[6px] text-[14px] font-medium hover:bg-violet-700 dark:hover:bg-violet-400 transition-colors mb-2"
        >
          Apply filters
        </button>
        <button onClick={clearFilters} className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 h-[36px] rounded-[6px] text-[13px] font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
          Reset all
        </button>
      </div>
    </div>
  );
}

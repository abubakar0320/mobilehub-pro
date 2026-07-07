import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function PriceRangeSlider({
  initialMin,
  initialMax,
  onChange
}: {
  initialMin: string,
  initialMax: string,
  onChange: (min: string, max: string) => void
}) {
  const [min, setMin] = useState(initialMin || "");
  const [max, setMax] = useState(initialMax || "");
  
  const [debouncedMin] = useDebounce(min, 400);
  const [debouncedMax] = useDebounce(max, 400);

  // Trigger onChange when debounced values change, but don't do it on first mount if unchanged
  useEffect(() => {
    if (debouncedMin !== initialMin || debouncedMax !== initialMax) {
      onChange(debouncedMin, debouncedMax);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMin, debouncedMax]);

  // Update local state if URL changes from outside
  useEffect(() => {
    setMin(initialMin || "");
    setMax(initialMax || "");
  }, [initialMin, initialMax]);

  const presets = [
    { label: "Under Rs. 56,000", min: "", max: "200" },
    { label: "Rs. 56,000–Rs. 140,000", min: "200", max: "500" },
    { label: "Rs. 140,000–Rs. 280,000", min: "500", max: "1000" },
    { label: "Rs. 280,000+", min: "1000", max: "" }
  ];

  return (
    <div>
      {/* Visual slider track placeholder (actual dual slider requires complex headless UI, using simple inputs here per common standard or simulated track) */}
      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full mb-4 relative">
        <div className="absolute left-[10%] right-[30%] top-0 bottom-0 bg-violet-500 dark:bg-violet-400 rounded-full"></div>
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-3 w-3 bg-violet-600 dark:bg-violet-500 border-2 border-white dark:border-zinc-900 rounded-full shadow-sm cursor-pointer"></div>
        <div className="absolute right-[30%] top-1/2 -translate-y-1/2 h-3 w-3 bg-violet-600 dark:bg-violet-500 border-2 border-white dark:border-zinc-900 rounded-full shadow-sm cursor-pointer"></div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-[12px]">$</span>
          <input 
            type="number" 
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[6px] h-8 pl-6 pr-2 text-[13px] text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500 dark:focus:border-violet-500"
            placeholder="Min"
          />
        </div>
        <span className="text-zinc-400 dark:text-zinc-500">-</span>
        <div className="relative flex-1">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-[12px]">$</span>
          <input 
            type="number" 
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[6px] h-8 pl-6 pr-2 text-[13px] text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500 dark:focus:border-violet-500"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button 
            key={p.label}
            onClick={() => {
              setMin(p.min);
              setMax(p.max);
            }}
            className="text-[11px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-[999px] px-2 py-1 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

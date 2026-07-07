"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandStats } from "@/types/brand";

function CountUp({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count}{suffix}</span>;
}

export function BrandStatBar({ stats, marketShare }: { stats: BrandStats, marketShare: number }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-auto md:h-[56px]">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-2 md:grid-cols-5 h-full divide-x divide-y md:divide-y-0 divide-slate-200 dark:divide-slate-800">
          
          <div className="flex flex-col items-center justify-center py-4 md:py-0">
            <span className="text-[20px] font-[900] text-sky-600 drop-shadow-sm">
              <CountUp end={stats.totalPhones} />
            </span>
            <span className="text-[10px] font-[800] text-sky-400 mt-[3px] uppercase tracking-widest">Total phones</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 md:py-0">
            <span className="text-[20px] font-[900] text-amber-500 drop-shadow-sm">
              <CountUp end={stats.avgRating} /> <span className="text-amber-400">★</span>
            </span>
            <span className="text-[10px] font-[800] text-amber-400 mt-[3px] uppercase tracking-widest">Avg rating</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 md:py-0">
            <span className="text-[20px] font-[900] text-emerald-500 drop-shadow-sm">
              <CountUp end={marketShare} suffix="%" />
            </span>
            <span className="text-[10px] font-[800] text-emerald-400 mt-[3px] uppercase tracking-widest">Market share</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 md:py-0">
            <span className="text-[20px] font-[900] text-indigo-500 drop-shadow-sm">
              <CountUp end={stats.newThisYear} />
            </span>
            <span className="text-[10px] font-[800] text-indigo-400 mt-[3px] uppercase tracking-widest">New in {currentYear}</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 md:py-0 col-span-2 md:col-span-1 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
            <span className="text-[20px] font-[900] text-rose-500 drop-shadow-sm">
              <CountUp end={stats.upcomingCount} />
            </span>
            <span className="text-[10px] font-[800] text-rose-400 mt-[3px] uppercase tracking-widest">Upcoming</span>
          </div>

        </div>
      </div>
    </div>
  );
}

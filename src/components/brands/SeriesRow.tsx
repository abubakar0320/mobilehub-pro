import Link from "next/link";
import { BrandSeries } from "@/types/brand";
import * as Icons from "lucide-react";

export function SeriesRow({ series, brandSlug }: { series: BrandSeries[], brandSlug: string }) {
  if (!series || series.length === 0) return null;

  return (
    <div id="series" className="pt-[32px] px-[28px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[20px] font-[700] text-slate-900 dark:text-slate-100 mb-[16px]">Browse by series</h2>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-[16px] pb-4">
          {series.map(s => {
            // @ts-ignore
            const Icon = Icons[s.icon] || Icons.Smartphone;
            
            return (
              <Link 
                href={`/phones?brand=${brandSlug}&series=${s.slug}`}
                key={s.slug}
                className="flex-shrink-0 w-[160px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 rounded-[12px] p-[16px] text-center group transition-colors"
              >
                <div className="mx-auto w-[48px] h-[48px] bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-[12px] group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-[600] text-slate-900 dark:text-slate-100 mb-[2px]">{s.name}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.phoneCount} phones</p>
              </Link>
            );
          })}
          
          <Link 
            href={`/phones?brand=${brandSlug}`}
            className="flex-shrink-0 w-[160px] bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 rounded-[12px] p-[16px] flex flex-col items-center justify-center group hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <div className="text-[13px] font-[600] text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
              View all series →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

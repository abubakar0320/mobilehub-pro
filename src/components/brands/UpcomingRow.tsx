import useSWR from "swr";
import { fetcher } from "@/lib/phones";

export function UpcomingRow({ brandSlug }: { brandSlug: string }) {
  const { data, isLoading } = useSWR(`/api/upcoming?brand=${brandSlug}`, fetcher);

  if (isLoading) return null;
  if (!data || !data.upcoming || data.upcoming.length === 0) return null;

  return (
    <div id="upcoming" className="pt-[32px] px-[28px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="text-[20px] font-[700] text-slate-900 dark:text-slate-100">Upcoming launches</h2>
          <button className="text-[13px] font-[500] text-blue-600 dark:text-blue-400 hover:underline">
            All upcoming →
          </button>
        </div>
        
        <div className="flex gap-[16px] overflow-x-auto hide-scrollbar pb-[16px] snap-x snap-mandatory -mx-[28px] px-[28px]">
          {data.upcoming?.map((item: any) => (
            <div key={item._id} className="min-w-[200px] flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[12px] p-[14px]">
              <div className={`inline-block text-[10px] font-[600] uppercase tracking-wider px-[8px] py-[2px] rounded-[4px] mb-[12px] ${item.color}`}>
                {item.status}
              </div>
              <h3 className="text-[14px] font-[600] text-slate-900 dark:text-slate-100 mb-[2px]">{item.name}</h3>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-[8px]">{item.date}</p>
              
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-[1.5] mb-[12px] line-clamp-2">
                {Array.isArray(item.specs) ? item.specs.map((s: any) => s.details).join(' • ') : item.summary}
              </p>

              {item.days && item.days < 30 && (
                <p className="text-[12px] font-[600] text-emerald-600 dark:text-emerald-400 mb-[12px]">
                  Launching in {item.days} days
                </p>
              )}

              <button className="w-full mt-auto text-[11px] font-[500] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 h-[28px] rounded-[6px] transition-colors">
                Set alert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

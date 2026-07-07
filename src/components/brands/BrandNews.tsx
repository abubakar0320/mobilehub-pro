import useSWR from "swr";
import { fetcher } from "@/lib/phones";
import Image from "next/image";

export function BrandNews({ brandSlug }: { brandSlug: string }) {
  const { data, isLoading } = useSWR(`/api/news?brand=${brandSlug}`, fetcher);

  if (isLoading) return null;
  if (!data || !data.news || data.news.length === 0) return null;

  return (
    <div id="news" className="pt-[32px] px-[28px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-[12px]">
          <h2 className="text-[20px] font-[700] text-[#0F172A]">Latest news</h2>
          <button className="text-[13px] font-[500] text-[#2563EB] hover:underline">
            All news →
          </button>
        </div>

        <div className="flex gap-[8px] mb-[16px] overflow-x-auto hide-scrollbar pb-2">
          {['All', 'Launches', 'Leaks', 'Reviews', 'Updates', 'Deals'].map((t, i) => (
            <button key={t} className={`text-[11px] font-[500] px-[12px] py-[6px] rounded-full whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#0F172A] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-[8px]">
          {data.news?.map((item: any) => (
            <div key={item._id} className="bg-white border border-[#E2E8F0] rounded-[10px] p-[12px] px-[14px] flex items-center gap-[12px] hover:border-[#94A3B8] transition-colors cursor-pointer group">
              <div className="w-[44px] h-[44px] rounded-[8px] bg-[#F1F5F9] relative overflow-hidden flex-shrink-0">
                <Image src={item.thumbnail} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div>
                <div className="text-[10px] font-[600] text-[#2563EB] uppercase tracking-wider mb-[2px]">
                  {item.category}
                </div>
                <h3 className="text-[13px] font-[600] text-[#0F172A] leading-[1.4] line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[10px] text-[#94A3B8] mt-[3px]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-[12px] text-[13px] font-[500] text-[#64748B] hover:text-[#0F172A] py-[8px] transition-colors">
          Load more news ↓
        </button>
      </div>
    </div>
  );
}

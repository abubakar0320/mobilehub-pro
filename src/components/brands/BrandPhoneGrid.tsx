"use client";

import useSWR from "swr";
import { useState } from "react";
import { fetcher, PhonesResponse } from "@/lib/phones";
import { PhoneGrid } from "@/components/phones/PhoneGrid";
import { LayoutGrid, List } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { CompareTray } from "@/components/phones/CompareTray";

export function BrandPhoneGrid({ brandSlug }: { brandSlug: string }) {
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState<'grid'|'list'>('grid');
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useSWR<PhonesResponse>(
    `/api/phones?brand=${brandSlug}&sort=${sort}&page=${page}&limit=${limit}`, 
    fetcher,
    { keepPreviousData: true }
  );

  const { compareList, addPhone, removePhone, isAdded } = useCompare();

  const handleSort = (s: string) => {
    setSort(s);
    setPage(1);
  };

  return (
    <div id="all-phones" className="pt-[32px] px-[28px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-[16px] gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-[700] text-[#0F172A]">Latest phones</h2>
            {data && <span className="text-[13px] text-[#64748B] font-medium">({data.total})</span>}
          </div>
          
          <div className="flex flex-wrap items-center gap-[12px]">
            <div className="flex items-center gap-[6px]">
              {[
                { id: 'newest', label: 'Newest' },
                { id: 'popularity', label: 'Popular' },
                { id: 'price_asc', label: 'Price ↑' },
                { id: 'price_desc', label: 'Price ↓' },
                { id: 'rating', label: 'Rating' }
              ].map(s => (
                <button 
                  key={s.id}
                  onClick={() => handleSort(s.id)}
                  className={`text-[11px] font-[500] px-[10px] py-[4px] rounded-full transition-colors border ${
                    sort === s.id 
                      ? 'bg-[#2563EB] text-white border-[#2563EB]' 
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#94A3B8]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1 border border-[#E2E8F0] rounded-[6px] p-1 bg-[#F8FAFC]">
              <button 
                onClick={() => setView('grid')}
                className={`p-1 rounded-[4px] transition-colors ${view === 'grid' ? 'bg-[#2563EB] text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-1 rounded-[4px] transition-colors ${view === 'list' ? 'bg-[#2563EB] text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Render phones using our generic PhoneGrid */}
        <div className="-mx-[20px] md:mx-0">
          <PhoneGrid 
            phones={data?.phones || []} 
            isLoading={isLoading} 
            view={view} 
            isAdded={isAdded}
            onAddCompare={addPhone}
            onRemoveCompare={removePhone}
          />
        </div>

        {data?.hasMore && (
          <div className="mt-[24px] flex justify-center">
            <button 
              onClick={() => setPage(p => p + 1)}
              className="px-[24px] py-[10px] bg-white border border-[#E2E8F0] text-[#0F172A] text-[13px] font-[600] rounded-full hover:border-[#94A3B8] transition-colors shadow-sm"
            >
              Load more phones
            </button>
          </div>
        )}
      </div>

      <CompareTray compareList={compareList} onRemove={removePhone} />
    </div>
  );
}

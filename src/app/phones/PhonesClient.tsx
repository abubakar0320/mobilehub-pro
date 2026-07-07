"use client";

import useSWR from "swr";
import { fetcher, PhonesResponse } from "@/lib/phones";
import { usePhoneFilters } from "@/hooks/usePhoneFilters";
import { useCompare } from "@/hooks/useCompare";
import { Search, X } from "lucide-react";

import { FilterSidebar } from "@/components/phones/FilterSidebar";
import { SortBar } from "@/components/phones/SortBar";
import { ActiveFilters } from "@/components/phones/ActiveFilters";
import { PhoneGrid } from "@/components/phones/PhoneGrid";
import { CompareTray } from "@/components/phones/CompareTray";
import { Pagination } from "@/components/phones/Pagination";

export function PhonesClient() {
  const { 
    searchParams, 
    getParam, 
    getArrayParam, 
    setFilter,
    setFilters, 
    toggleArrayFilter, 
    clearFilters 
  } = usePhoneFilters();

  const {
    compareList,
    addPhone,
    removePhone,
    isAdded
  } = useCompare();

  const currentView = (getParam('view') as 'grid' | 'list') || 'grid';
  const searchQuery = getParam('q') || '';
  
  // Construct API URL
  const queryString = searchParams.toString();
  const { data, isLoading } = useSWR<PhonesResponse>(
    `/api/phones${queryString ? `?${queryString}` : ''}`, 
    fetcher,
    { keepPreviousData: true }
  );

  const filters = {
    brand: getArrayParam('brand'),
    ram: getArrayParam('ram'),
    storage: getArrayParam('storage'),
    price_min: getParam('price_min'),
    price_max: getParam('price_max'),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

      {/* ── Search context banner ── */}
      {searchQuery && (
        <div
          className="w-full px-6 py-4 flex items-center gap-3 border-b"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.06))",
            borderColor: "rgba(124,58,237,0.15)",
          }}
        >
          <Search className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
          <div className="flex-1 min-w-0">
            <span className="text-[15px] font-[700]" style={{ color: "var(--color-text-1)" }}>
              Results for &quot;<span style={{ color: "var(--color-primary)" }}>{searchQuery}</span>&quot;
            </span>
            {!isLoading && (
              <span className="text-[13px] font-[500] ml-2" style={{ color: "var(--color-text-3)" }}>
                — {data?.total ?? 0} phones found
              </span>
            )}
          </div>
          <button
            onClick={() => setFilter('q', '')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[700] transition-all"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-3)",
            }}
          >
            <X className="h-3.5 w-3.5" />
            Clear search
          </button>
        </div>
      )}

      <SortBar 
        totalCount={data?.total || 0}
        currentSort={getParam('sort') || 'popularity'}
        currentView={currentView}
        setSort={(val) => setFilter('sort', val)}
        setView={(val) => setFilter('view', val)}
      />

      <div className="flex flex-1 relative">
        <FilterSidebar 
          filters={filters}
          toggleArrayFilter={toggleArrayFilter}
          setFilter={setFilter}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />

        <div className="flex-1 flex flex-col min-w-0 pb-[80px]">
          <div className="px-[20px] md:px-[24px]">
            <ActiveFilters 
              filters={filters}
              toggleArrayFilter={toggleArrayFilter}
              setFilter={setFilter}
              clearFilters={clearFilters}
            />
          </div>

          <PhoneGrid 
            phones={data?.phones || []} 
            isLoading={isLoading} 
            view={currentView}
            isAdded={isAdded}
            onAddCompare={addPhone}
            onRemoveCompare={removePhone}
          />

          <Pagination 
            currentPage={data?.page || 1}
            totalPages={data?.totalPages || 1}
            setPage={(p) => setFilter('page', p.toString())}
          />
        </div>
      </div>

      <CompareTray 
        compareList={compareList} 
        onRemove={removePhone} 
      />
    </div>
  );
}

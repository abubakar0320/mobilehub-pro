"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/phones";
import { UpcomingPhone } from "@/types/upcoming";
import { UpcomingHero } from "@/components/upcoming/UpcomingHero";
import { UpcomingFilterBar } from "@/components/upcoming/UpcomingFilterBar";
import { UpcomingCard } from "@/components/upcoming/UpcomingCard";
import { Loader2 } from "lucide-react";

export function UpcomingClient({ topLaunch }: { topLaunch: UpcomingPhone }) {
  const [brand, setBrand] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');

  const url = `/api/upcoming?brand=${brand}&status=${status}`;
  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  const phones: UpcomingPhone[] = data?.upcoming || [];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-[80px]">
      
      {/* Page Title */}
      <div className="text-center pt-[40px] px-[24px] pb-[32px]">
        <h1 className="text-[36px] md:text-[44px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-[8px] drop-shadow-sm tracking-tight">Upcoming Launches</h1>
        <p className="text-[15px] font-[700] text-zinc-400 uppercase tracking-widest">Track leaks, rumors, and official launch countdowns for the most anticipated phones.</p>
      </div>

      <div className="max-w-7xl mx-auto px-[24px] mb-[40px]">
        {brand === 'All' && status === 'All' && <UpcomingHero phone={topLaunch} />}
      </div>

      <UpcomingFilterBar 
        activeBrand={brand} 
        onBrandChange={setBrand}
        activeStatus={status}
        onStatusChange={setStatus}
      />

      <div className="max-w-7xl mx-auto px-[24px] pt-[40px]">
        <h2 className="text-[24px] font-[900] text-zinc-900 mb-[24px] pb-[12px] border-b-[3px] border-fuchsia-500 inline-block">
          {brand === 'All' && status === 'All' ? 'All Anticipated Devices' : `Filtered Devices (${phones.length})`}
        </h2>

        {isLoading && phones.length === 0 ? (
          <div className="flex justify-center py-[60px]">
            <Loader2 className="h-8 w-8 text-[#2563EB] animate-spin" />
          </div>
        ) : phones.length === 0 ? (
          <div className="text-center py-[60px] bg-white border border-[#E2E8F0] rounded-[16px]">
            <p className="text-[#64748B] text-[15px]">No upcoming devices found for these filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {phones.map(phone => (
              <UpcomingCard key={phone._id} phone={phone} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

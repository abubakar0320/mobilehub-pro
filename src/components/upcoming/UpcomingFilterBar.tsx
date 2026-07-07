import { UpcomingStatus } from "@/types/upcoming";

const BRANDS = ['All', 'Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'];
const STATUSES: (UpcomingStatus | 'All')[] = ['All', 'Official', 'Teased', 'Leaked', 'Rumor'];

export function UpcomingFilterBar({
  activeBrand,
  onBrandChange,
  activeStatus,
  onStatusChange
}: {
  activeBrand: string;
  onBrandChange: (b: string) => void;
  activeStatus: string;
  onStatusChange: (s: string) => void;
}) {
  return (
    <div className="sticky top-[60px] z-30 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] py-[16px] px-[24px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-[16px]">
        
        {/* Brand Filters */}
        <div className="flex items-center gap-[8px] overflow-x-auto hide-scrollbar w-full md:w-auto">
          <span className="text-[13px] font-[600] text-[#0F172A] mr-[8px] flex-shrink-0">Brand:</span>
          {BRANDS.map(b => (
            <button
              key={b}
              onClick={() => onBrandChange(b)}
              className={`flex-shrink-0 text-[13px] font-[500] px-[16px] py-[8px] rounded-full transition-colors border ${
                activeBrand === b
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-[8px] overflow-x-auto hide-scrollbar w-full md:w-auto">
          <span className="text-[13px] font-[600] text-[#0F172A] mr-[8px] flex-shrink-0">Status:</span>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`flex-shrink-0 text-[13px] font-[500] px-[16px] py-[8px] rounded-full transition-colors border ${
                activeStatus === s
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-[#F8FAFC] text-[#64748B] border-transparent hover:border-[#E2E8F0] hover:bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

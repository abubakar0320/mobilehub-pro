import Image from "next/image";
import Link from "next/link";
import { UpcomingPhone } from "@/types/upcoming";
import { differenceInDays, format } from "date-fns";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export function UpcomingCard({ phone }: { phone: UpcomingPhone }) {
  const daysLeft = differenceInDays(new Date(phone.expectedDate), new Date());
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Official': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Teased': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Leaked': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Rumor': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <Link href={`/upcoming/${phone.slug}`} className="flex flex-col group bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden hover:border-[#94A3B8] transition-all hover:shadow-lg hover:-translate-y-1">
      
      {/* Top Image Area */}
      <div className="relative aspect-[16/10] w-full bg-[#F8FAFC] overflow-hidden">
        <Image 
          src={phone.heroImage} 
          alt={phone.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-[16px] left-[16px] flex flex-col gap-2">
          <div className={`text-[10px] font-[700] uppercase tracking-wider px-[12px] py-[6px] rounded-[6px] border shadow-sm backdrop-blur-md ${getStatusColor(phone.status)}`}>
            {phone.status}
          </div>
        </div>

        <div className="absolute bottom-[16px] left-[16px] right-[16px] flex items-end justify-between">
          <div>
            <h3 className="text-[22px] font-[800] text-white leading-[1.2] mb-[4px] tracking-tight drop-shadow-md">
              {phone.name}
            </h3>
            <p className="text-[13px] text-slate-200 font-[500] drop-shadow-md">
              Est. {format(new Date(phone.expectedDate), 'MMMM yyyy')}
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md rounded-[10px] border border-white/20 px-[12px] py-[8px] flex flex-col items-center">
            <span className="text-[20px] font-[800] text-white leading-none">{daysLeft}</span>
            <span className="text-[9px] text-white/80 uppercase tracking-wider font-[700] mt-[2px]">Days</span>
          </div>
        </div>
      </div>
      
      {/* Specs Area */}
      <div className="p-[20px] flex flex-col flex-1">
        <p className="text-[14px] text-[#64748B] line-clamp-2 leading-[1.5] mb-[20px] flex-1">
          {phone.summary}
        </p>

        <div className="flex flex-col gap-[12px] mb-[24px]">
          {phone.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex items-start gap-[8px]">
              <div className="w-[4px] h-[4px] rounded-full bg-[#2563EB] mt-[8px] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-[600] text-[#94A3B8] uppercase tracking-wider">{spec.category}</span>
                <span className="text-[13px] font-[500] text-[#0F172A] leading-[1.4]">{spec.details}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-[16px] border-t border-[#F1F5F9]">
          <div className="flex items-center gap-[6px] bg-[#F8FAFC] px-[12px] py-[6px] rounded-[8px]">
            {phone.confidenceScore > 80 ? (
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-orange-500" />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-[600] text-[#94A3B8] uppercase">Confidence</span>
              <span className="text-[13px] font-[700] text-[#0F172A] leading-none">{phone.confidenceScore}%</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-[600] text-[#94A3B8] uppercase">Est. Price</span>
            <span className="text-[15px] font-[700] text-[#0F172A]">{phone.expectedPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

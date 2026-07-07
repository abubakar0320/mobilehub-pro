import Image from "next/image";
import Link from "next/link";
import { UpcomingPhone } from "@/types/upcoming";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { Timer, ArrowRight } from "lucide-react";

export function UpcomingHero({ phone }: { phone?: UpcomingPhone }) {
  if (!phone) return null;

  const daysLeft = differenceInDays(new Date(phone.expectedDate), new Date());

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#0F172A] aspect-auto md:aspect-[21/9] min-h-[450px] group">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
      
      <Image 
        src={phone.heroImage} 
        alt={phone.name} 
        fill 
        className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000 ease-out"
        priority
      />

      <div className="absolute inset-0 z-20 flex flex-col justify-center p-[32px] md:p-[60px] max-w-3xl">
        <div className="inline-flex items-center gap-[8px] bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-[600] uppercase tracking-widest px-[16px] py-[8px] rounded-full mb-[24px] w-fit">
          <Timer className="h-4 w-4 text-emerald-400" />
          {phone.status} Launch
        </div>
        
        <h1 className="text-[40px] md:text-[56px] font-[800] text-white leading-[1.1] mb-[16px] tracking-tight">
          {phone.name}
        </h1>
        
        <p className="text-[16px] md:text-[20px] text-slate-300 line-clamp-3 leading-[1.6] mb-[32px] font-[400] max-w-2xl">
          {phone.summary}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-[24px]">
          <div className="flex gap-[16px]">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-[12px] border border-white/10 p-[12px] min-w-[80px]">
              <span className="text-[28px] font-[800] text-white leading-none mb-[4px]">{daysLeft}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-[600]">Days</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-[12px] border border-white/10 p-[12px] min-w-[80px]">
              <span className="text-[28px] font-[800] text-emerald-400 leading-none mb-[4px]">{phone.confidenceScore}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-[600]">Certainty</span>
            </div>
          </div>
          
          <Link 
            href={`/upcoming/${phone.slug}`}
            className="flex items-center justify-center gap-2 h-[56px] px-[32px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[15px] font-[600] rounded-full transition-colors shadow-lg shadow-blue-500/25"
          >
            View Leaked Specs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

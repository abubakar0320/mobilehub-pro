"use client";

import { UpcomingPhone } from "@/types/upcoming";
import Image from "next/image";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { ArrowLeft, Timer, ShieldCheck, ShieldAlert, Cpu, Camera, Battery, Smartphone } from "lucide-react";

export function UpcomingDetailClient({ phone }: { phone: UpcomingPhone }) {
  const daysLeft = differenceInDays(new Date(phone.expectedDate), new Date());

  const getIconForCategory = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('display') || cat.includes('form')) return <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    if (cat.includes('processor') || cat.includes('ram')) return <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    if (cat.includes('camera')) return <Camera className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    if (cat.includes('battery')) return <Battery className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
    return <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
  };

  return (
    <article className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-[100px]">
      
      {/* Top Navigation */}
      <div className="sticky top-[60px] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[800px] mx-auto px-[24px] h-[56px] flex items-center">
          <Link href="/upcoming" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 text-[13px] font-[500] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Upcoming Launches
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="max-w-[800px] mx-auto px-[24px] pt-[40px] pb-[40px]">
        <div className="flex flex-wrap items-center gap-[12px] mb-[24px]">
          <span className="inline-flex items-center justify-center bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[11px] font-[700] uppercase tracking-widest px-[12px] py-[4px] rounded-[4px]">
            {phone.brandName}
          </span>
          <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 text-[11px] font-[700] uppercase tracking-widest px-[12px] py-[4px] rounded-[4px]">
            {phone.status}
          </span>
        </div>

        <h1 className="text-[36px] md:text-[52px] font-[800] text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight mb-[24px]">
          {phone.name}
        </h1>

        <p className="text-[18px] md:text-[22px] text-slate-500 dark:text-slate-400 leading-[1.6] mb-[32px]">
          {phone.summary}
        </p>

        {/* Confidence & Countdown Row */}
        <div className="flex flex-col sm:flex-row gap-[16px]">
          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[16px] p-[20px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-[12px]">
              <div className="h-[48px] w-[48px] rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Timer className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-[600] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expected Launch</span>
                <span className="text-[16px] font-[700] text-slate-900 dark:text-slate-100">{format(new Date(phone.expectedDate), 'MMMM d, yyyy')}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[28px] font-[800] text-blue-600 dark:text-blue-500 leading-none">{daysLeft}</span>
              <span className="text-[10px] font-[700] text-slate-400 dark:text-slate-500 uppercase tracking-wider">Days Away</span>
            </div>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[16px] p-[20px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-[12px]">
              <div className={`h-[48px] w-[48px] rounded-full flex items-center justify-center ${phone.confidenceScore > 80 ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
                {phone.confidenceScore > 80 ? <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-500" /> : <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-500" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-[600] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Confidence Score</span>
                <span className="text-[16px] font-[700] text-slate-900 dark:text-slate-100">Reliability</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`block text-[28px] font-[800] leading-none ${phone.confidenceScore > 80 ? 'text-emerald-600 dark:text-emerald-500' : 'text-amber-600 dark:text-amber-500'}`}>{phone.confidenceScore}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-[1000px] mx-auto px-[24px] mb-[60px]">
        <div className="relative aspect-[16/9] w-full rounded-[16px] md:rounded-[24px] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <Image 
            src={phone.heroImage} 
            alt={phone.name} 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Leaked Specs Board */}
      <div className="max-w-[800px] mx-auto px-[24px]">
        <h2 className="text-[24px] font-[800] text-slate-900 dark:text-slate-100 mb-[24px] tracking-tight">Rumored Specifications</h2>
        
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[16px] overflow-hidden shadow-sm">
          {phone.specs.map((spec, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center p-[20px] border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-[12px] w-[200px] mb-[8px] sm:mb-0">
                <div className="h-[32px] w-[32px] rounded-[8px] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  {getIconForCategory(spec.category)}
                </div>
                <span className="text-[14px] font-[600] text-slate-900 dark:text-slate-100">{spec.category}</span>
              </div>
              <div className="flex-1 text-[15px] text-slate-600 dark:text-slate-400 font-[500] leading-[1.5]">
                {spec.details}
              </div>
            </div>
          ))}
          
          {/* Expected Price Row */}
          <div className="flex flex-col sm:flex-row sm:items-center p-[20px] bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-white dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-[12px] w-[200px] mb-[8px] sm:mb-0">
              <span className="text-[14px] font-[700] text-blue-700 dark:text-blue-400">Expected Price</span>
            </div>
            <div className="flex-1 text-[20px] text-blue-700 dark:text-blue-400 font-[800]">
              {phone.expectedPrice}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-[40px] pt-[32px] border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-[8px]">
          {phone.tags.map(tag => (
            <span key={tag} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[12px] font-[600] px-[12px] py-[6px] rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

    </article>
  );
}

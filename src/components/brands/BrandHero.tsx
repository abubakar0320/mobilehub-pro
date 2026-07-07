"use client";

import Image from "next/image";
import { Heart, Bell, Share2 } from "lucide-react";
import { Brand } from "@/types/brand";
import { useState } from "react";

export function BrandHero({ brand }: { brand: Brand }) {
  const [following, setFollowing] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleFollow = () => {
    setFollowing(!following);
    window.alert(following ? `Unfollowed ${brand.name}` : `Following ${brand.name}! You'll get new phone alerts.`);
  };

  const handleAlert = () => {
    setAlert(!alert);
    window.alert(alert ? `Alerts disabled for ${brand.name}` : `Launch alerts enabled for ${brand.name}.`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    window.alert("Brand link copied to clipboard!");
  };

  const isAndroid = brand.os === 'Android';

  return (
    <div className="w-full bg-white dark:bg-slate-900 px-[28px] pt-[28px] pb-0 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-[20px] pb-[28px]">
        
        {/* Logo */}
        <div className="w-[72px] h-[72px] rounded-[16px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center relative flex-shrink-0">
          <Image src={brand.logo} alt={brand.name} fill className="object-contain p-[12px]" />
        </div>

        {/* Meta Info */}
        <div className="flex-1">
          <h1 className="text-[36px] md:text-[44px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-[4px] leading-tight drop-shadow-sm tracking-tight">
            {brand.name}
          </h1>
          
          <p className="text-[14px] text-slate-500 dark:text-slate-400 max-w-2xl leading-[1.5] mb-[12px] line-clamp-2">
            {brand.tagline}
          </p>

          <div className="flex flex-wrap gap-[8px] mb-[16px]">
            <span className={`border-2 rounded-xl text-[12px] px-[12px] py-[4px] font-[800] ${isAndroid ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-zinc-200 bg-zinc-50 text-zinc-600'}`}>
              {brand.os}
            </span>
            <span className="border-2 border-amber-200 bg-amber-50 rounded-xl text-[12px] px-[12px] py-[4px] font-[800] text-amber-700">
              Est. {brand.founded}
            </span>
            <span className="border-2 border-emerald-200 bg-emerald-50 rounded-xl text-[12px] px-[12px] py-[4px] font-[800] text-emerald-700">
              {brand.country}
            </span>
            <span className="border-2 border-indigo-200 bg-indigo-50 rounded-xl text-[12px] px-[12px] py-[4px] font-[800] text-indigo-700">
              {brand.ui}
            </span>
          </div>

          <div className="flex flex-wrap gap-[10px] mt-[16px]">
            <button className="h-[36px] px-[20px] bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-[10px] text-[13px] font-[800] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-200 transition-all">
              View all phones
            </button>
            <button 
              onClick={handleFollow}
              className={`h-[36px] px-[16px] border-2 rounded-[10px] text-[13px] font-[800] flex items-center gap-2 hover:-translate-y-0.5 transition-all ${following ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-md shadow-rose-100' : 'border-zinc-200 bg-white text-zinc-500 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50'}`}
            >
              <Heart className={`h-4 w-4 ${following ? 'fill-current' : ''}`} />
              {following ? 'Following' : 'Follow brand'}
            </button>
            <button 
              onClick={handleAlert}
              className={`h-[36px] px-[16px] border-2 rounded-[10px] text-[13px] font-[800] flex items-center gap-2 hover:-translate-y-0.5 transition-all ${alert ? 'border-sky-200 bg-sky-50 text-sky-600 shadow-md shadow-sky-100' : 'border-zinc-200 bg-white text-zinc-500 hover:border-sky-300 hover:text-sky-500 hover:bg-sky-50'}`}
            >
              <Bell className={`h-4 w-4 ${alert ? 'fill-current' : ''}`} />
              Launch alerts
            </button>
            <button 
              onClick={handleShare}
              className="h-[36px] px-[16px] border-2 border-zinc-200 bg-white text-zinc-500 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 hover:-translate-y-0.5 rounded-[10px] text-[13px] font-[800] flex items-center gap-2 transition-all"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

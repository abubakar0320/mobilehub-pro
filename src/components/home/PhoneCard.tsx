"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Check } from "lucide-react";
import { Phone } from "@/data/phones";
import { useCompare } from "@/hooks/useCompare";

export function PhoneCard({ phone }: { phone: Phone }) {
  const { addPhone, isAdded, removePhone } = useCompare();
  
  // Create a slug from the name if not present (simple version)
  const slug = phone.name.toLowerCase().replace(/ /g, '-');
  const added = isAdded(phone.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      removePhone(phone.id);
    } else {
      addPhone({
        id: phone.id,
        name: phone.name,
        image: phone.image
      });
    }
  };

  return (
    <Link 
      href={`/phones/${slug}`}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[12px] overflow-hidden hover:-translate-y-[2px] hover:border-violet-400 dark:hover:border-violet-500 transition-all group cursor-pointer flex flex-col h-full"
    >
      {/* Top image area */}
      <div className="h-[160px] bg-zinc-50 dark:bg-zinc-800 relative flex items-center justify-center p-4">
        {(phone.isNew || phone.isHot) && (
          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold z-10 uppercase tracking-wider ${phone.isHot ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400' : 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400'}`}>
            {phone.isHot ? 'Hot' : 'New'}
          </div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 text-zinc-300 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 transition-colors z-10 bg-white/50 dark:bg-zinc-900/50 rounded-full p-1.5 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="w-full h-full relative">
          <Image 
            src={phone.image} 
            alt={phone.name} 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Bottom info area */}
      <div className="p-[14px] flex flex-col flex-1">
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-[1px]">{phone.brand}</span>
        <h3 className="text-[15px] font-[600] text-zinc-900 dark:text-zinc-100 truncate mb-2">{phone.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">{phone.rating}</span>
          <span className="text-[13px] text-zinc-400 dark:text-zinc-500">({phone.reviews})</span>
        </div>

        <div className="text-[18px] font-[700] text-violet-600 dark:text-violet-400 mb-3">
          ${phone.price}
        </div>

        <div className="flex gap-2 mb-4">
          {Object.values(phone.specs).map(spec => (
            <span key={spec} className="text-[11px] border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md px-2 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button 
            onClick={handleCompare}
            className={`flex-1 text-[13px] border font-medium transition-colors h-8 rounded-md flex items-center justify-center gap-1 ${
              added 
              ? "bg-violet-50 border-violet-200 text-violet-600 dark:bg-violet-900/20 dark:border-violet-800 dark:text-violet-400" 
              : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
            }`}
          >
            {added ? <><Check className="h-3.5 w-3.5" /> Added</> : "Compare"}
          </button>
          <div className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-[13px] font-semibold rounded-md hover:from-violet-700 hover:to-indigo-600 transition-all h-8 flex items-center justify-center">
            Details →
          </div>
        </div>
      </div>
    </Link>
  );
}


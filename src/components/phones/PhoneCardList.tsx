import Image from "next/image";
import { Heart, Star, Check, Scale } from "lucide-react";
import { PhoneData } from "@/lib/phones";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";

export function PhoneCardList({ 
  phone,
  isCompareAdded,
  onCompareToggle
}: { 
  phone: PhoneData,
  isCompareAdded: boolean,
  onCompareToggle: () => void
}) {
  const badgeColors = {
    new: 'bg-[#E6F1FB] text-[#185FA5]',
    hot: 'bg-[#FAECE7] text-[#993C1D]',
    sale: 'bg-[#EAF3DE] text-[#27500A]',
    award: 'bg-[#FAEEDA] text-[#633806]',
    upcoming: 'bg-[#EEEDFE] text-[#534AB7]'
  };

  const activeBadge = phone.badges[0];

  return (
    <div className="bg-white border-2 border-[#E2E8F0] rounded-[16px] h-[130px] p-[12px] px-[16px] flex items-center gap-[16px] hover:border-fuchsia-300 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-100/50">
      
      {/* Left: Image */}
      <div className="w-[80px] h-[96px] bg-[#F8FAFC] rounded-[8px] relative flex-shrink-0 flex items-center justify-center p-2">
        <Image 
          src={phone.images.main} 
          alt={phone.model} 
          fill 
          className="object-contain"
        />
      </div>

      {/* Center: Info */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-[#94A3B8] uppercase tracking-[0.05em] font-medium">{phone.brand}</span>
          {activeBadge && (
            <span className={`px-1.5 py-0.5 rounded-[999px] text-[9px] font-bold uppercase tracking-wider ${badgeColors[activeBadge]}`}>
              {activeBadge}
            </span>
          )}
        </div>
        <h3 className="text-[16px] font-[600] text-[#0F172A] truncate mb-1">{phone.model}</h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-[13px] font-[500] text-[#0F172A]">{phone.rating.average.toFixed(1)}</span>
          <span className="text-[12px] text-[#64748B]">({phone.rating.count.toLocaleString()} reviews)</span>
        </div>

        <div className="flex gap-2">
          <span className="text-[11px] font-[800] bg-sky-50 border border-sky-200 text-sky-700 rounded-[8px] px-2 py-0.5">{phone.specs.ram}GB RAM</span>
          <span className="text-[11px] font-[800] bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-[8px] px-2 py-0.5">{phone.specs.storage}GB</span>
          <span className="text-[11px] font-[800] bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-[8px] px-2 py-0.5 hidden sm:inline-block">{phone.specs.battery}mAh</span>
          <span className="text-[11px] font-[800] bg-rose-50 border border-rose-200 text-rose-700 rounded-[8px] px-2 py-0.5 hidden md:inline-block truncate max-w-[120px]">{phone.specs.chipset}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col items-end justify-center ml-4 flex-shrink-0 w-[140px]">
        <div className="text-[20px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-2 drop-shadow-sm">
          Rs. {(phone.price.usd * 280).toLocaleString()}
        </div>
        <div className="flex items-center gap-2 w-full mt-2">
          <button 
            onClick={onCompareToggle}
            title={isCompareAdded ? "Remove from compare" : "Add to compare"}
            className={`w-[36px] h-[36px] shrink-0 flex items-center justify-center rounded-[10px] border-2 transition-all ${
              isCompareAdded ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 border-transparent text-white shadow-md' : 'bg-transparent border-[#E2E8F0] text-[#475569] hover:border-violet-300 hover:text-violet-500 hover:bg-violet-50'
            }`}
          >
            {isCompareAdded ? <Check className="h-4 w-4 font-bold" /> : <Scale className="h-4 w-4 font-bold" />}
          </button>
          <a href={`/phones/${phone.slug}`}
             className="flex-1 text-[13px] font-[800] h-[36px] border-2 rounded-[10px] transition-all text-center border-[#E2E8F0] text-[#475569] hover:border-fuchsia-300 hover:text-fuchsia-600 hover:bg-fuchsia-50 flex items-center justify-center">
            Details
          </a>
          <CheckoutButton phone={phone} variant="mini" />
        </div>
      </div>

    </div>
  );
}

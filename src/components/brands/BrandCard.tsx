import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { Star } from "lucide-react";

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link 
      href={`/brands/${brand.slug}`}
      className="bg-white border-2 border-zinc-200 rounded-[20px] p-[24px] flex flex-col items-center text-center group hover:border-fuchsia-300 hover:shadow-xl hover:shadow-fuchsia-100/50 transition-all duration-300 hover:-translate-y-2"
    >
      <div className="h-[64px] w-[64px] border border-zinc-100 rounded-[16px] bg-zinc-50 flex items-center justify-center p-3 mb-[16px] relative group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md">
        <Image src={brand.logo} alt={brand.name} fill className="object-contain p-1.5" />
      </div>
      
      <h3 className="text-[17px] font-[900] text-zinc-900 mb-[2px] group-hover:text-fuchsia-600 transition-colors">{brand.name}</h3>
      <p className="text-[12px] font-[700] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md mb-[8px]">{brand.stats.totalPhones} phones</p>
      
      <div className="flex items-center gap-1 mb-[4px]">
        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
        <span className="text-[12px] font-[800] text-zinc-700">{brand.stats.avgRating.toFixed(1)}</span>
      </div>
      
      <p className="text-[11px] font-[700] text-zinc-400 uppercase tracking-widest mb-[16px]">{brand.country}</p>
      
      <div className="mt-auto text-[13px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 group-hover:opacity-80 transition-opacity">
        View brand →
      </div>
    </Link>
  );
}

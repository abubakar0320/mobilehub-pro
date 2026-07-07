import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { PhoneData } from "@/lib/phones";

export function FeaturedPhones({ phones, brandSlug }: { phones: PhoneData[], brandSlug: string }) {
  if (!phones || phones.length === 0) return null;

  const featured = phones.slice(0, 2);

  return (
    <div id="flagships" className="pt-[32px] px-[28px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-[16px]">
          <h2 className="text-[20px] font-[700] text-[#0F172A]">Featured phones</h2>
          <Link href={`/phones?brand=${brandSlug}`} className="text-[13px] font-[500] text-[#2563EB] hover:underline">
            See all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {featured.map(phone => (
            <div key={phone._id} className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden group hover:border-[#2563EB] transition-colors">
              
              <div className="h-[200px] bg-[#F8FAFC] relative flex items-center justify-center p-[20px]">
                <div className="absolute top-3 left-3 bg-[#E6F1FB] text-[#185FA5] px-2 py-0.5 rounded-[999px] text-[10px] font-bold uppercase tracking-wider z-10">
                  Flagship
                </div>
                <button className="absolute top-3 right-3 text-[#94A3B8] hover:text-red-500 transition-colors z-10">
                  <Heart className="h-5 w-5" />
                </button>
                <div className="w-full h-full relative">
                  <Image src={phone.images.main} alt={phone.model} fill className="object-contain" />
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1">
                  {phone.colors.slice(0, 3).map((c, i) => (
                    <div key={i} className="h-[10px] w-[10px] rounded-full border border-white shadow-sm" style={{ backgroundColor: c }}></div>
                  ))}
                </div>
              </div>

              <div className="p-[16px]">
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-medium block mb-1">{phone.brand}</span>
                <h3 className="text-[17px] font-[700] text-[#0F172A] mb-1">{phone.model}</h3>
                
                <p className="text-[12px] text-[#64748B] mb-3">
                  {phone.releaseYear} · {phone.specs.cameraDeep?.main.mp || 50} MP · {phone.specs.chipset}
                </p>

                <div className="flex gap-1 mb-3">
                  <span className="text-[11px] border border-[#E2E8F0] text-[#475569] rounded-[4px] px-1.5 py-0.5">{phone.specs.ram}GB RAM</span>
                  <span className="text-[11px] border border-[#E2E8F0] text-[#475569] rounded-[4px] px-1.5 py-0.5">{phone.specs.storage}GB</span>
                  <span className="text-[11px] border border-[#E2E8F0] text-[#475569] rounded-[4px] px-1.5 py-0.5">{phone.specs.battery}mAh</span>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-[13px] font-[500] text-[#0F172A]">{phone.rating.average.toFixed(1)}</span>
                  <span className="text-[12px] text-[#64748B]">({phone.rating.count.toLocaleString()})</span>
                </div>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-[20px] font-[700] text-[#2563EB] leading-none">
                      Rs. {(phone.price.usd * 280).toLocaleString()}
                    </div>
                    {phone.price.original && (
                      <div className="text-[14px] text-[#94A3B8] line-through mt-1">
                        ${phone.price.original}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/compare?phones=${phone._id}`} className="flex-1 border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] h-[36px] rounded-[8px] text-[13px] font-medium transition-colors flex items-center justify-center">
                    Compare
                  </Link>
                  <button className="flex-1 bg-[#2563EB] text-white h-[36px] rounded-[8px] text-[13px] font-medium hover:bg-[#1d4ed8] transition-colors flex items-center justify-center">
                    View details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

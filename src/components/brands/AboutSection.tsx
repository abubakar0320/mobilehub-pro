import { Building2, Info } from "lucide-react";
import { Brand } from "@/types/brand";

export function AboutSection({ brand }: { brand: Brand }) {
  return (
    <div id="about" className="pt-[32px] px-[28px] pb-[40px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        
        {/* Left: Company Info */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[12px] p-[18px]">
          <div className="flex items-center gap-2 mb-[16px]">
            <Building2 className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-[16px] font-[600] text-slate-900 dark:text-slate-100">Company info</h2>
          </div>
          
          <div className="flex flex-col">
            {[
              { label: "Founded", value: brand.founded },
              { label: "Headquarters", value: brand.hq },
              { label: "CEO", value: brand.ceo },
              { label: "OS / UI", value: `${brand.os} (${brand.ui})` },
              { label: "Website", value: <a href={brand.website} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">{brand.website.replace('https://', '')}</a> }
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-[12px] border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                <span className="text-[12px] font-[500] text-slate-500 dark:text-slate-400">{row.label}</span>
                <span className="text-[12px] font-[500] text-slate-900 dark:text-slate-100 text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: About */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[12px] p-[18px]">
          <div className="flex items-center gap-2 mb-[16px]">
            <Info className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-[16px] font-[600] text-slate-900 dark:text-slate-100">About {brand.name}</h2>
          </div>
          
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-[1.7] mb-[16px]">
            {brand.about}
          </p>
          
          <div>
            <h3 className="text-[11px] font-[600] uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-[8px]">Popular for</h3>
            <div className="flex flex-wrap gap-[6px]">
              {brand.popularFor.map(tag => (
                <span key={tag} className="text-[11px] font-[500] bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 px-[10px] py-[4px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

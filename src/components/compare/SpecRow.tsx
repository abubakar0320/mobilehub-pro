import { Check } from "lucide-react";
import { PhoneData } from "@/lib/phones";

export function SpecRow({
  label,
  categoryKey,
  phones,
  winners,
  getValue
}: {
  label: string,
  categoryKey: string,
  phones: PhoneData[],
  winners: Record<string, string>,
  getValue: (phone: PhoneData) => string | number | boolean
}) {
  const winnerId = winners[categoryKey];

  return (
    <div className="flex min-w-max md:min-w-0 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      
      {/* Label Column (Sticky) */}
      <div className="w-[140px] md:w-[180px] flex-shrink-0 sticky left-0 bg-white dark:bg-zinc-900 p-[12px] flex items-center shadow-[1px_0_0_#e4e4e7] dark:shadow-[1px_0_0_#27272a] z-10">
        <span className="text-[11px] font-[500] text-zinc-900 dark:text-zinc-100">{label}</span>
      </div>

      {/* Value Columns */}
      {phones.map((phone) => {
        const isWinner = winnerId === phone._id;
        const val = getValue(phone);
        
        let displayVal = val;
        if (typeof val === 'boolean') {
          displayVal = val ? 'Yes' : 'No';
        }

        return (
          <div 
            key={`${phone._id}-${label}`} 
            className={`flex-1 min-w-[120px] p-[12px] flex items-center justify-center text-center relative border-r border-zinc-100 dark:border-zinc-800 last:border-r-0 transition-colors ${
              isWinner ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 font-[600]' : 'text-zinc-600 dark:text-zinc-400 font-[400]'
            }`}
          >
            {isWinner && (
              <div className="absolute top-1 right-1 bg-white dark:bg-zinc-900 rounded-full shadow-sm p-0.5 animate-in zoom-in-50 duration-300">
                <Check className="h-2 w-2 text-emerald-700 dark:text-emerald-500" strokeWidth={3} />
              </div>
            )}
            <span className="text-[11px]">{displayVal}</span>
          </div>
        );
      })}

    </div>
  );
}

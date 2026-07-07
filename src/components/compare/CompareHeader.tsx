import { FileText, Share2, Plus } from "lucide-react";
import { PhoneSlot } from "./PhoneSlot";
import { PhoneData } from "@/lib/phones";

export function CompareHeader({
  phones,
  onRemove,
  onAddClick,
  onShareClick,
  onPdfClick
}: {
  phones: PhoneData[],
  onRemove: (id: string) => void,
  onAddClick: () => void,
  onShareClick: () => void,
  onPdfClick: () => void
}) {
  const maxSlots = 4;
  const emptySlots = Math.max(0, maxSlots - phones.length);

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-transparent [border-image:linear-gradient(to_right,#8b5cf6,#ec4899)_1] rounded-[16px] p-[20px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px] mx-[24px] mb-[32px] shadow-lg shadow-violet-100/50">
      
      {/* Left: Phone Slots */}
      <div className="flex flex-wrap gap-[8px]">
        {phones.map(phone => (
          <PhoneSlot key={phone._id} phone={phone} onRemove={() => onRemove(phone._id)} />
        ))}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} onClick={onAddClick}>
            <PhoneSlot />
          </div>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-[10px] self-end md:self-auto">
        <button 
          onClick={onPdfClick}
          className="flex items-center justify-center gap-1.5 h-[40px] px-[16px] bg-sky-50 dark:bg-zinc-800 border-2 border-sky-200 dark:border-zinc-700 rounded-[10px] text-[13px] font-[800] text-sky-600 dark:text-zinc-400 hover:text-sky-700 dark:hover:text-zinc-200 hover:bg-sky-100 transition-all hover:-translate-y-0.5 hover:shadow-md shadow-sky-100"
          title="Export to PDF"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>

        <button 
          onClick={onShareClick}
          className="flex items-center justify-center gap-1.5 h-[40px] px-[16px] bg-emerald-50 dark:bg-zinc-800 border-2 border-emerald-200 dark:border-zinc-700 rounded-[10px] text-[13px] font-[800] text-emerald-600 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-zinc-200 hover:bg-emerald-100 transition-all hover:-translate-y-0.5 hover:shadow-md shadow-emerald-100"
          title="Share comparison"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {phones.length < 4 && (
          <button 
            onClick={onAddClick}
            className="flex items-center justify-center gap-1.5 h-[40px] px-[20px] bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-[10px] text-[13px] font-[800] hover:-translate-y-0.5 hover:shadow-lg shadow-fuchsia-200 transition-all"
          >
            <Plus className="h-4 w-4 font-bold" />
            <span className="hidden sm:inline">Add phone</span>
          </button>
        )}
      </div>

    </div>
  );
}

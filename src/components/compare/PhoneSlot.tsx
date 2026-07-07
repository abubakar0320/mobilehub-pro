import { Smartphone, X, Plus } from "lucide-react";
import { PhoneData } from "@/lib/phones";

export function PhoneSlot({ 
  phone, 
  onRemove 
}: { 
  phone?: PhoneData, 
  onRemove?: () => void 
}) {
  if (!phone) {
    return (
      <div className="flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-[10px] h-[40px] px-[12px] min-w-[120px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <Plus className="h-3 w-3 text-slate-400 dark:text-slate-500 mr-1" />
        <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">Add phone</span>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-white dark:bg-slate-800 border border-blue-600 dark:border-blue-500 rounded-[10px] h-[40px] px-[12px] gap-2 min-w-[120px]">
      <Smartphone className="h-[18px] w-[18px] text-blue-600 dark:text-blue-500" />
      <span className="text-[12px] font-[500] text-slate-900 dark:text-slate-100 truncate max-w-[100px]">{phone.model}</span>
      <button 
        onClick={onRemove}
        className="ml-auto text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-500 transition-colors"
      >
        <X className="h-[14px] w-[14px]" />
      </button>
    </div>
  );
}

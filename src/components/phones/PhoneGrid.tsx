import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { PhoneData } from "@/lib/phones";
import { PhoneCard } from "./PhoneCard";
import { PhoneCardList } from "./PhoneCardList";
import { ComparePhone } from "@/hooks/useCompare";

export function PhoneGrid({
  phones,
  isLoading,
  view,
  isAdded,
  onAddCompare,
  onRemoveCompare
}: {
  phones: PhoneData[],
  isLoading: boolean,
  view: 'grid' | 'list',
  isAdded: (id: string) => boolean,
  onAddCompare: (p: ComparePhone) => void,
  onRemoveCompare: (id: string) => void
}) {

  const handleCompareToggle = (phone: PhoneData) => {
    if (isAdded(phone._id)) {
      onRemoveCompare(phone._id);
    } else {
      onAddCompare({ id: phone._id, name: phone.model, image: phone.images.main });
    }
  };

  if (isLoading) {
    return (
      <div className={view === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px] p-[20px] md:p-[24px]" : "flex flex-col gap-[16px] p-[20px] md:p-[24px]"}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`bg-white border border-[#E2E8F0] rounded-[12px] animate-pulse ${view === 'grid' ? 'h-[360px]' : 'h-[120px]'}`}>
            <div className={`bg-[#F1F5F9] ${view === 'grid' ? 'h-[180px] w-full' : 'h-[96px] w-[80px] m-[12px] rounded-[8px]'}`}></div>
          </div>
        ))}
      </div>
    );
  }

  if (phones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-[100px] text-center">
        <Smartphone className="h-[48px] w-[48px] text-[#94A3B8] mb-4" strokeWidth={1} />
        <h3 className="text-[20px] font-semibold text-[#0F172A] mb-2">No phones found</h3>
        <p className="text-[#64748B] mb-6 text-[14px]">Try adjusting your filters or search with different keywords.</p>
      </div>
    );
  }

  return (
    <div className={view === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[12px] md:gap-[16px] p-[12px] md:p-[24px]" : "flex flex-col gap-[16px] p-[16px] md:p-[24px]"}>
      {phones.map((phone, i) => (
        <motion.div
          key={phone._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {view === 'grid' ? (
            <PhoneCard 
              phone={phone} 
              isCompareAdded={isAdded(phone._id)} 
              onCompareToggle={() => handleCompareToggle(phone)} 
            />
          ) : (
            <PhoneCardList 
              phone={phone} 
              isCompareAdded={isAdded(phone._id)} 
              onCompareToggle={() => handleCompareToggle(phone)} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

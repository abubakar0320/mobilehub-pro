import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  setPage
}: {
  currentPage: number,
  totalPages: number,
  setPage: (p: number) => void
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-16">
      <button 
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 flex items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] disabled:opacity-50 disabled:pointer-events-none"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`h-8 w-8 flex items-center justify-center rounded-[6px] text-[13px] font-medium transition-colors ${
            currentPage === p 
              ? 'bg-[#2563EB] text-white border border-[#2563EB]' 
              : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
          }`}
        >
          {p}
        </button>
      ))}

      <button 
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 flex items-center justify-center rounded-[6px] border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] disabled:opacity-50 disabled:pointer-events-none"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { useComparePhones } from "@/hooks/useComparePhones";
import { CompareHeader } from "@/components/compare/CompareHeader";
import { SpecTable } from "@/components/compare/SpecTable";
import { VerdictCards } from "@/components/compare/VerdictCards";
import { OverallAnalysis } from "@/components/compare/OverallAnalysis";
import { CTABar } from "@/components/compare/CTABar";

export function CompareClient() {
  const { ids, phones, isLoading, winners, removePhone } = useComparePhones();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePdfClick = async () => {
    if (!printRef.current) return;
    
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`compare-${phones.map(p => p.slug).join('-vs-')}.pdf`);
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Compare link copied to clipboard!");
  };

  const handleAddClick = () => {
    // Basic fallback if modal is not fully implemented yet
    // In a real app this opens a search modal.
    const newId = window.prompt("Enter phone ID to add (e.g. phone-3):");
    if (newId) {
      const currentUrl = new URL(window.location.href);
      const newIds = ids.length ? `${ids.join(',')},${newId}` : newId;
      currentUrl.searchParams.set('phones', newIds);
      window.location.href = currentUrl.toString();
    }
  };

  if (!isLoading && ids.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-[100px] px-[24px] text-center min-h-[60vh] bg-zinc-50 dark:bg-zinc-900">
          <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-violet-100">
            <BarChart2 className="h-10 w-10 text-violet-500" strokeWidth={2} />
          </div>
          <h2 className="text-[28px] font-[900] text-zinc-900 dark:text-zinc-100 mb-[12px] tracking-tight">Select phones to compare</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-[15px] max-w-md mb-[32px] font-medium">
            Add at least 2 phones to start comparing features, specs, performance benchmarks, and prices.
          </p>
          <Link 
            href="/phones"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-[32px] h-[48px] rounded-[12px] font-[800] text-[15px] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-fuchsia-200 transition-all"
          >
            Browse phones →
          </Link>
        </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen pb-[80px]">
      
      {/* Page Title */}
      <div className="text-center pt-[40px] px-[24px] pb-[32px]">
        <h1 className="text-[36px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-[8px] drop-shadow-sm tracking-tight">Compare phones</h1>
        <p className="text-[15px] font-[700] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Side-by-side specs, performance & pricing comparison</p>
      </div>

      <div ref={printRef} className="bg-zinc-50 dark:bg-zinc-900 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="mx-[24px] flex items-center justify-center h-[400px]">
            <div className="animate-pulse flex gap-4">
              <div className="w-[120px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-[12px]"></div>
              <div className="w-[120px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-[12px]"></div>
              <div className="w-[120px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-[12px]"></div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <CompareHeader 
              phones={phones} 
              onRemove={removePhone} 
              onAddClick={handleAddClick}
              onShareClick={handleShareClick}
              onPdfClick={handlePdfClick}
            />

            <SpecTable phones={phones} winners={winners} />

            <VerdictCards phones={phones} winners={winners} />

            <OverallAnalysis phones={phones} winners={winners} />
          </motion.div>
        )}
      </div>

      <CTABar />

    </div>
  );
}

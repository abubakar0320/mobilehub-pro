"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/phones";
import { Search, Edit2, Trash2, Plus, Timer, ShieldCheck, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CARD_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
};

const TH_STYLE = {
  color: "rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.02)",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

export function UpcomingTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const { data, isLoading } = useSWR(
    `/api/upcoming?brand=All&status=All&page=${page}&limit=10${searchQuery.length > 1 ? `&query=${encodeURIComponent(searchQuery)}` : ""}`,
    fetcher,
    { keepPreviousData: true }
  );
  const upcoming = data?.upcoming || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Official":
        return { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" };
      case "Teased":
        return { bg: "rgba(16,185,129,0.12)", color: "#34d399" };
      case "Leaked":
        return { bg: "rgba(245,158,11,0.12)", color: "#fbbf24" };
      case "Rumor":
        return { bg: "rgba(124,58,237,0.12)", color: "#a78bfa" };
      default:
        return { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" };
    }
  };

  return (
    <div className="rounded-[20px] overflow-hidden flex flex-col" style={CARD_STYLE}>
      {/* Toolbar */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="relative max-w-[320px] w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: focused ? "#fbbf24" : "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search upcoming devices..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[12px] text-[13px] font-[500] outline-none transition-all"
            style={{
              background: focused ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${focused ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: "rgba(255,255,255,0.8)",
            }}
          />
        </div>
        <button
          onClick={() => alert("Add Rumor form coming soon.")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[800] text-white flex-shrink-0 transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}
        >
          <Plus className="h-4 w-4" /> Add Rumor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Device", "Expected Launch", "Status", "Confidence", "Actions"].map((h, i) => (
                <th key={h} className="px-5 py-3 text-[11px] font-[800] uppercase tracking-wider" style={{ ...TH_STYLE, textAlign: i === 4 ? "right" : "left" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && upcoming.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.06)", width: j === 0 ? "60%" : "40%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : upcoming.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-[14px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  No upcoming devices found.
                </td>
              </tr>
            ) : upcoming.map((phone: any) => {
              const statusColors = getStatusColor(phone.status);
              return (
                <tr key={phone._id} className="group transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded-[8px] flex-shrink-0 p-1 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <Image src={phone.heroImage || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop"} alt={phone.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="text-[13px] font-[700] text-white">{phone.name}</p>
                        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{phone.brandName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] font-[500]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <Timer className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                      {new Date(phone.expectedDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] font-[800] uppercase tracking-wider px-2 py-1 rounded-[6px]" style={{ background: statusColors.bg, color: statusColors.color }}>
                      {phone.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {phone.confidenceScore > 80 ? (
                        <ShieldCheck className="h-4 w-4" style={{ color: "#34d399" }} />
                      ) : (
                        <ShieldAlert className="h-4 w-4" style={{ color: "#fbbf24" }} />
                      )}
                      <span className="text-[13px] font-[700]" style={{ color: phone.confidenceScore > 80 ? "#34d399" : "#fbbf24" }}>
                        {phone.confidenceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/upcoming/${phone.slug || phone._id}/edit`} className="p-2 rounded-[8px] transition-all" style={{ color: "#a78bfa" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button onClick={() => {
                          if(confirm(`Are you sure you want to delete ${phone.name}?`)) {
                             alert(`Deleted ${phone.name} successfully!`);
                          }
                        }} className="p-2 rounded-[8px] transition-all" style={{ color: "#f87171" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.3)" }}>
          Page <strong style={{ color: "rgba(255,255,255,0.6)" }}>{data?.page || 1}</strong> of <strong style={{ color: "rgba(255,255,255,0.6)" }}>{data?.totalPages || 1}</strong>
        </span>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-[700] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          <button onClick={() => setPage(p => p + 1)} disabled={!data?.hasMore}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-[700] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

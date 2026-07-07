"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/phones";
import { Search, Edit2, Trash2, Plus, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "use-debounce";

const CARD_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
};

const TH_STYLE = {
  color: "rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.02)",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

export function BrandsTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading } = useSWR(
    `/api/brands?page=${page}&limit=10&query=${debouncedQuery}`,
    fetcher,
    { keepPreviousData: true }
  );
  const brands = data?.brands || [];

  return (
    <div className="rounded-[20px] overflow-hidden" style={CARD_STYLE}>

      {/* Toolbar */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="relative max-w-[320px] w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: focused ? "#a78bfa" : "rgba(255,255,255,0.25)" }} />
          <input
            type="text" value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search brands..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[12px] text-[13px] font-[500] outline-none transition-all"
            style={{
              background: focused ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${focused ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: "rgba(255,255,255,0.8)",
            }}
          />
        </div>
        <button
          onClick={() => alert("Add Brand form coming soon.")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[800] text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}
        >
          <Plus className="h-4 w-4" />Add Brand
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Brand", "Region", "OS", "Total Phones", "Market Share", "Actions"].map((h, i) => (
                <th key={h} className="px-5 py-3 text-[11px] font-[800] uppercase tracking-wider"
                  style={{ ...TH_STYLE, textAlign: i === 5 ? "right" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && brands.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 rounded-full animate-pulse"
                        style={{ background: "rgba(255,255,255,0.06)", width: j === 0 ? "60%" : "40%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : brands.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center text-[14px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}>No brands found.</td>
              </tr>
            ) : brands.map((brand: any) => (
              <tr key={brand._id} className="group transition-colors"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                {/* Brand name */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] flex-shrink-0 p-1.5 relative overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      <Image src={brand.logo} alt={brand.name} width={28} height={28} className="object-contain w-full h-full" />
                    </div>
                    <div>
                      <p className="text-[13px] font-[700] text-white">{brand.name}</p>
                      <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>/{brand.slug}</p>
                    </div>
                  </div>
                </td>
                {/* Region */}
                <td className="px-5 py-3.5">
                  <span className="text-[12px] font-[600] px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                    {brand.region || "Global"}
                  </span>
                </td>
                {/* OS */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>{brand.os}</span>
                  </div>
                </td>
                {/* Total phones */}
                <td className="px-5 py-3.5">
                  <span className="text-[14px] font-[800] text-white">{brand.stats?.totalPhones ?? "—"}</span>
                </td>
                {/* Market share */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${brand.marketShare}%`, background: "linear-gradient(90deg,#7c3aed,#6366f1)" }} />
                    </div>
                    <span className="text-[12px] font-[700]" style={{ color: "#a78bfa" }}>{brand.marketShare}%</span>
                  </div>
                </td>
                {/* Actions */}
                <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/brands/${brand._id}/edit`} className="p-2 rounded-[8px] transition-all" style={{ color: "#a78bfa" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button onClick={() => {
                          if(confirm(`Are you sure you want to delete ${brand.name}?`)) {
                             alert(`Deleted ${brand.name} successfully!`);
                          }
                        }} className="p-2 rounded-[8px] transition-all" style={{ color: "#f87171" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.12)"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.3)" }}>
          Page <strong style={{ color: "rgba(255,255,255,0.6)" }}>{data?.page || 1}</strong> of{" "}
          <strong style={{ color: "rgba(255,255,255,0.6)" }}>{data?.totalPages || 1}</strong>
        </span>
        <div className="flex gap-2">
          {[
            { icon: ChevronLeft, label: "Prev", action: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1 },
            { icon: ChevronRight, label: "Next", action: () => setPage((p) => p + 1), disabled: !data?.hasMore },
          ].map(({ icon: Icon, label, action, disabled }) => (
            <button key={label} onClick={action} disabled={disabled}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-[700] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

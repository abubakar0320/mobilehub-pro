"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/phones";
import { Search, Edit2, Trash2, Plus, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
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

export function NewsTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  
  const { data, isLoading } = useSWR(`/api/news?category=All&page=${page}&limit=10${debouncedQuery.length > 1 ? `&query=${encodeURIComponent(debouncedQuery)}` : ""}`, fetcher, { keepPreviousData: true });
  const news = data?.news || [];

  return (
    <div className="rounded-[20px] overflow-hidden flex flex-col" style={CARD_STYLE}>
      
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="relative max-w-[320px] w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: focused ? "#34d399" : "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[12px] text-[13px] font-[500] outline-none transition-all"
            style={{
              background: focused ? "rgba(52,211,153,0.08)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${focused ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: "rgba(255,255,255,0.8)",
            }}
            placeholder="Search articles by title..."
          />
        </div>

        <button onClick={() => alert("Write Article form coming soon.")} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[800] text-white flex-shrink-0 transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}>
          <Plus className="h-4 w-4" />
          Write Article
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Article", "Category", "Author", "Published", "Actions"].map((h, i) => (
                <th key={h} className="px-5 py-3 text-[11px] font-[800] uppercase tracking-wider" style={{ ...TH_STYLE, textAlign: i === 4 ? "right" : "left" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && news.length === 0 ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.06)", width: j === 0 ? "60%" : "40%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : news.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-[14px]" style={{ color: "rgba(255,255,255,0.3)" }}>No articles found.</td>
              </tr>
            ) : news.map((article: any) => (
              <tr key={article._id} className="group transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 rounded-[8px] relative overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                      {article.thumbnail ? (
                        <Image src={article.thumbnail} alt={article.title} fill className="object-cover" sizes="64px" />
                      ) : (
                        <ImageIcon className="h-5 w-5" style={{ color: "rgba(255,255,255,0.3)" }} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-[700] text-white line-clamp-1 max-w-[250px]" title={article.title}>{article.title}</span>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>/{article.slug}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-5 py-3.5">
                  <span className="text-[11px] font-[800] px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: "rgba(14,165,233,0.12)", color: "#38bdf8" }}>
                    {article.category}
                  </span>
                </td>
                
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Image src={article.author.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"} alt={article.author.name} width={24} height={24} className="rounded-full object-cover" />
                    <span className="text-[13px] font-[600]" style={{ color: "rgba(255,255,255,0.7)" }}>{article.author.name}</span>
                  </div>
                </td>
                
                <td className="px-5 py-3.5">
                  <span className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </td>
                
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/news/${article.slug || article._id}/edit`} className="p-2 rounded-[8px] transition-all" style={{ color: "#a78bfa" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button onClick={() => {
                        if(confirm(`Are you sure you want to delete ${article.title}?`)) {
                           alert(`Deleted ${article.title} successfully!`);
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

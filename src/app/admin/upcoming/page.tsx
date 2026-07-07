"use client";

import { UpcomingTable } from "@/components/admin/UpcomingTable";
import { Plus, Rocket, Download, Filter } from "lucide-react";
import Link from "next/link";
import { downloadCsv } from "@/lib/exportCsv";
import { useState } from "react";

export default function AdminUpcomingPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/upcoming?limit=1000");
      const data = await res.json();
      if (data.upcoming) {
        downloadCsv(data.upcoming, "mobilehub-upcoming");
      } else {
        alert("No data found.");
      }
    } catch (e) {
      alert("Error exporting data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#0f0f14" }}
    >
      {/* ── Page Header ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-[800] uppercase tracking-widest"
            style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.2)",
              color: "#fbbf24",
            }}
          >
            <Rocket className="h-3 w-3" />
            Launch Tracker
          </div>
          <h1
            className="text-[36px] font-[900] leading-tight tracking-tight mb-2"
            style={{ color: "white" }}
          >
            Upcoming Launches
          </h1>
          <p className="text-[14px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Manage rumors, leaks, and official teasers for unreleased devices.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[700] transition-all duration-200 disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <Download className={`h-4 w-4 ${isExporting ? "animate-bounce" : ""}`} />
            {isExporting ? "Exporting..." : "Export"}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[800] transition-all duration-200 text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}
            onClick={() => alert("Add Rumor form coming soon.")}
          >
            <Plus className="h-4 w-4" />
            Add Rumor
          </button>
        </div>
      </div>

      {/* ── Section Label ────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <Filter className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
        <h2
          className="text-[13px] font-[800] uppercase tracking-[0.12em]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Tracked Devices
        </h2>
      </div>

      {/* ── Table ───────────────────────────────────── */}
      <UpcomingTable />
    </div>
  );
}

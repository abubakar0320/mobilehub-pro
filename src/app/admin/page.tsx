"use client";

import { StatCards } from "@/components/admin/StatCards";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { MarketShareChart } from "@/components/admin/MarketShareChart";
import { QuickActions } from "@/components/admin/QuickActions";
import { BarChart2, Download, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#0f0f14" }}
    >
      {/* ── Page header ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-[800] uppercase tracking-widest"
            style={{
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "#34d399",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            Superadmin · Live
          </div>

          <h1
            className="text-[36px] font-[900] leading-tight tracking-tight mb-2"
            style={{ color: "white" }}
          >
            Command Center
          </h1>
          <p className="text-[14px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
            {dateStr} &nbsp;·&nbsp; {timeStr}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[700] transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <ExternalLink className="h-4 w-4" />
            Live Site
          </Link>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[800] transition-all duration-200 text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
            }}
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* ── Stat cards ───────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          <h2 className="text-[13px] font-[800] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Platform Overview
          </h2>
        </div>
        <StatCards />
      </div>

      {/* ── Analytics row ────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-5">
          <BarChart2 className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          <h2 className="text-[13px] font-[800] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            Traffic &amp; Audience
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2" style={{ minHeight: 380 }}>
            <TrafficChart />
          </div>
          <div style={{ minHeight: 380 }}>
            <MarketShareChart />
          </div>
        </div>
      </div>

      {/* ── Operations row ───────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Zap className="h-4 w-4" style={{ color: "rgba(255,255,255,0.3)" }} />
          <h2 className="text-[13px] font-[800] uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            System &amp; Operations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <SystemHealth />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

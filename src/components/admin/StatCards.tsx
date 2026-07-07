"use client";

import { Smartphone, Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    title: "Total Devices",
    value: "1,248",
    change: "+12",
    pct: "+1.2%",
    trend: "up",
    icon: Smartphone,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
    desc: "vs last month",
  },
  {
    title: "Active Users",
    value: "84.2K",
    change: "+4.5K",
    pct: "+5.4%",
    trend: "up",
    icon: Users,
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
    desc: "monthly actives",
  },
  {
    title: "Pageviews (30d)",
    value: "1.2M",
    change: "+210K",
    pct: "+18%",
    trend: "up",
    icon: Eye,
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    desc: "total impressions",
  },
  {
    title: "Engagement Rate",
    value: "68%",
    change: "-1.4%",
    pct: "-2%",
    trend: "down",
    icon: TrendingUp,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    desc: "avg session depth",
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const isUp = stat.trend === "up";
        return (
          <div
            key={stat.title}
            className="relative rounded-[20px] p-5 flex flex-col gap-4 overflow-hidden transition-all duration-300 group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = `${stat.color}40`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${stat.color}15`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Glow blob */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: stat.color, filter: "blur(40px)", opacity: 0.08 }}
            />

            {/* Top row */}
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{ background: stat.bg }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div
                className="flex items-center gap-1 text-[12px] font-[700] px-2 py-1 rounded-full"
                style={{
                  background: isUp ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                  color: isUp ? "#34d399" : "#f87171",
                }}
              >
                {isUp ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.pct}
              </div>
            </div>

            {/* Value */}
            <div>
              <p
                className="text-[32px] font-[900] leading-none tracking-tight mb-1"
                style={{ color: "white" }}
              >
                {stat.value}
              </p>
              <p className="text-[12px] font-[600]" style={{ color: "rgba(255,255,255,0.3)" }}>
                {stat.title}
              </p>
            </div>

            {/* Bottom */}
            <div
              className="flex items-center gap-1.5 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="text-[12px] font-[700]"
                style={{ color: isUp ? "#34d399" : "#f87171" }}
              >
                {stat.change}
              </span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                {stat.desc}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

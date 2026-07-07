"use client";

import { Smartphone, FileText, DollarSign, Flag, Star } from "lucide-react";

const activities = [
  {
    icon: Smartphone,
    action: "Phone Added",
    item: "Samsung Galaxy S25 Ultra",
    time: "2h ago",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
  },
  {
    icon: FileText,
    action: "Review Published",
    item: "iPhone 16 Pro In-Depth Review",
    time: "5h ago",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: DollarSign,
    action: "Price Updated",
    item: "Google Pixel 9 Pro — Rs. 28,000 drop",
    time: "1d ago",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: Star,
    action: "Upcoming Leaked",
    item: "OnePlus 13 Pro specs revealed",
    time: "1d ago",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
  },
  {
    icon: Flag,
    action: "Comment Flagged",
    item: "Spam detected on Xiaomi 15 page",
    time: "2d ago",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
  },
];

export function RecentActivity() {
  return (
    <div
      className="rounded-[20px] p-6 h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-5">
        <h3 className="text-[16px] font-[800] text-white mb-1">Recent Activity</h3>
        <p className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
          Latest CMS events
        </p>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        {activities.map((act, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-[14px] transition-all duration-200 group cursor-default"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: act.bg }}
            >
              <act.icon className="h-4 w-4" style={{ color: act.color }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-[10px] font-[800] uppercase tracking-wider"
                  style={{ color: act.color }}
                >
                  {act.action}
                </span>
              </div>
              <p
                className="text-[13px] font-[600] leading-snug truncate"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {act.item}
              </p>
            </div>

            {/* Time */}
            <span
              className="text-[11px] font-[500] flex-shrink-0 mt-0.5"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {act.time}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          className="w-full text-center text-[12px] font-[700] transition-colors py-1"
          style={{ color: "#7c3aed" }}
        >
          View all activity →
        </button>
      </div>
    </div>
  );
}

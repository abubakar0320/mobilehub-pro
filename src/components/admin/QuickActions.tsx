"use client";

import { Smartphone, PenTool, Zap, Users, Settings2, ArrowRight } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: Smartphone,
    label: "Add Device",
    desc: "Publish new phone",
    href: "/admin/phones",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.12)",
  },
  {
    icon: PenTool,
    label: "Draft News",
    desc: "Write an article",
    href: "/admin/news",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
  },
  {
    icon: Zap,
    label: "Add Rumor",
    desc: "Upcoming device",
    href: "/admin/upcoming",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: Users,
    label: "Manage Roles",
    desc: "Access control",
    href: "/admin/settings",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    icon: Settings2,
    label: "Global Config",
    desc: "Site settings",
    href: "/admin/settings",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
  },
];

export function QuickActions() {
  return (
    <div
      className="rounded-[20px] p-6 h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-5">
        <h3 className="text-[16px] font-[800] text-white mb-1">Quick Actions</h3>
        <p className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
          Common admin tasks
        </p>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = action.bg;
              (e.currentTarget as HTMLElement).style.borderColor = `${action.color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
            }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ background: action.bg }}
            >
              <action.icon className="h-4 w-4" style={{ color: action.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-[700] text-white leading-none">{action.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                {action.desc}
              </p>
            </div>
            <ArrowRight
              className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
              style={{ color: action.color }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

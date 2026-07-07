"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  Building2,
  Newspaper,
  Settings,
  Rocket,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "Phones Catalog", href: "/admin/phones", icon: Smartphone, badge: "1.2k" },
      { name: "Brands", href: "/admin/brands", icon: Building2 },
      { name: "News Hub", href: "/admin/news", icon: Newspaper, badge: "3 new" },
      { name: "Upcoming", href: "/admin/upcoming", icon: Rocket },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[260px] h-screen fixed left-0 top-0 flex flex-col z-40"
      style={{
        background: "#09090d",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p
              className="text-[10px] font-[800] uppercase tracking-[0.14em] px-3 mb-2"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 relative"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.15))"
                        : "transparent",
                      border: `1px solid ${isActive ? "rgba(124,58,237,0.3)" : "transparent"}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-full"
                        style={{ background: "linear-gradient(180deg, #7c3aed, #6366f1)" }}
                      />
                    )}
                    <item.icon
                      className="h-4 w-4 flex-shrink-0"
                      style={{
                        color: isActive ? "#a78bfa" : "rgba(255,255,255,0.4)",
                      }}
                    />
                    <span
                      className="text-[13px] font-[600] flex-1"
                      style={{
                        color: isActive ? "#e9d5ff" : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {item.name}
                    </span>
                    {"badge" in item && item.badge && (
                      <span
                        className="text-[10px] font-[700] px-1.5 py-0.5 rounded-full"
                        style={{
                          background: isActive
                            ? "rgba(167,139,250,0.2)"
                            : "rgba(255,255,255,0.08)",
                          color: isActive ? "#a78bfa" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {!isActive && (
                      <ChevronRight
                        className="h-3.5 w-3.5 opacity-0 group-hover:opacity-40 transition-opacity"
                        style={{ color: "white" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User footer */}
      <div
        className="p-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* User info */}
        <div
          className="flex items-center gap-3 p-3 rounded-[12px] mb-2"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-[800] text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-[700] text-white leading-none truncate">
              Admin User
            </p>
            <p
              className="text-[11px] mt-0.5 truncate"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              superadmin@mobilehub.pro
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-[10px] text-left transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
            (e.currentTarget as HTMLElement).style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
          }}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-[13px] font-[600]">Sign out</span>
        </button>
      </div>
    </aside>
  );
}

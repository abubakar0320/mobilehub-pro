"use client";

import { Bell, Search, ExternalLink, Settings, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AdminHeader() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="h-[64px] sticky top-0 z-30 flex items-center justify-between px-6 gap-4 flex-shrink-0"
      style={{
        background: "rgba(15,15,20,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-[400px]">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search
            className="h-4 w-4 transition-colors"
            style={{ color: searchFocused ? "#a78bfa" : "rgba(255,255,255,0.25)" }}
          />
        </div>
        <input
          type="text"
          placeholder="Search devices, news, brands..."
          className="w-full pl-10 pr-4 py-2 rounded-[10px] text-[13px] font-[500] outline-none transition-all duration-200"
          style={{
            background: searchFocused
              ? "rgba(124,58,237,0.08)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${searchFocused ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.07)"}`,
            color: "rgba(255,255,255,0.8)",
            boxShadow: searchFocused ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] font-[600] px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* View live site */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-[10px] text-[12px] font-[700] transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Live Site
        </Link>

        {/* Dark mode toggle */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-[10px] transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <Moon className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-[10px] transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <Bell className="h-4 w-4" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
            style={{
              background: "#f87171",
              borderColor: "#0f0f14",
            }}
          />
        </button>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className="w-9 h-9 flex items-center justify-center rounded-[10px] transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <Settings className="h-4 w-4" />
        </Link>

        {/* Divider */}
        <div
          className="w-px h-6 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Avatar */}
        <button className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-[800] text-white transition-transform duration-200 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6366f1)",
              boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
            }}
          >
            A
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-[12px] font-[700] text-white leading-none">
              Admin User
            </span>
            <span
              className="text-[10px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Superadmin
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}

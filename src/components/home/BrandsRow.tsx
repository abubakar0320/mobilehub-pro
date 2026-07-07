"use client";

import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { useState } from "react";

const BRANDS = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "iPhone creators",
    emoji: "🍎",
    color: "#1d1d1f",
    accent: "#6e6e73",
    bg: "linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)",
    textColor: "#fff",
    market: "20%",
    phones: "42",
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "Galaxy series",
    emoji: "💙",
    color: "#1428A0",
    accent: "#4f6af5",
    bg: "linear-gradient(135deg, #1428A0 0%, #2d4ae8 100%)",
    textColor: "#fff",
    market: "22%",
    phones: "612",
  },
  {
    name: "Google",
    slug: "google",
    tagline: "Pixel pure Android",
    emoji: "🔵",
    color: "#4285F4",
    accent: "#34A853",
    bg: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
    textColor: "#fff",
    market: "4%",
    phones: "28",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    tagline: "Innovation for all",
    emoji: "🟠",
    color: "#FF6900",
    accent: "#ff8c3a",
    bg: "linear-gradient(135deg, #ff4500 0%, #FF6900 100%)",
    textColor: "#fff",
    market: "14%",
    phones: "450",
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    tagline: "Never Settle",
    emoji: "🔴",
    color: "#EB0028",
    accent: "#ff4d6a",
    bg: "linear-gradient(135deg, #c0001f 0%, #EB0028 100%)",
    textColor: "#fff",
    market: "3%",
    phones: "56",
  },
  {
    name: "Realme",
    slug: "realme",
    tagline: "Dare to Leap",
    emoji: "⚡",
    color: "#FFCB00",
    accent: "#ffe066",
    bg: "linear-gradient(135deg, #f5b800 0%, #FFCB00 100%)",
    textColor: "#1a1a1a",
    market: "5%",
    phones: "180",
  },
  {
    name: "Vivo",
    slug: "vivo",
    tagline: "Camera & style",
    emoji: "💜",
    color: "#415FFF",
    accent: "#7b94ff",
    bg: "linear-gradient(135deg, #3048f5 0%, #415FFF 100%)",
    textColor: "#fff",
    market: "9%",
    phones: "220",
  },
  {
    name: "Oppo",
    slug: "oppo",
    tagline: "Charge on the go",
    emoji: "🟢",
    color: "#1D7F4E",
    accent: "#34c97a",
    bg: "linear-gradient(135deg, #166038 0%, #1D7F4E 100%)",
    textColor: "#fff",
    market: "9%",
    phones: "310",
  },
  {
    name: "Motorola",
    slug: "motorola",
    tagline: "Hello Moto",
    emoji: "⚙️",
    color: "#5E5CE6",
    accent: "#8b89ff",
    bg: "linear-gradient(135deg, #4a48cc 0%, #5E5CE6 100%)",
    textColor: "#fff",
    market: "4%",
    phones: "160",
  },
  {
    name: "Sony",
    slug: "sony",
    tagline: "Xperia Pro series",
    emoji: "🎮",
    color: "#16213E",
    accent: "#0f72e5",
    bg: "linear-gradient(135deg, #0d1a38 0%, #0f3460 100%)",
    textColor: "#fff",
    market: "2%",
    phones: "95",
  },
  {
    name: "Nothing",
    slug: "nothing",
    tagline: "Design-first phone",
    emoji: "⬛",
    color: "#0D0D0D",
    accent: "#f0f0f0",
    bg: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
    textColor: "#fff",
    market: "1%",
    phones: "12",
  },
  {
    name: "Asus",
    slug: "asus",
    tagline: "ROG gaming power",
    emoji: "🎯",
    color: "#C1121F",
    accent: "#e63946",
    bg: "linear-gradient(135deg, #9d0f17 0%, #C1121F 100%)",
    textColor: "#fff",
    market: "1%",
    phones: "48",
  },
  {
    name: "Honor",
    slug: "honor",
    tagline: "Born for the brave",
    emoji: "🏅",
    color: "#c23616",
    accent: "#e84118",
    bg: "linear-gradient(135deg, #9d2b12 0%, #c23616 100%)",
    textColor: "#fff",
    market: "4%",
    phones: "200",
  },
  {
    name: "Huawei",
    slug: "huawei",
    tagline: "HarmonyOS leader",
    emoji: "🌺",
    color: "#CF0A2C",
    accent: "#ff3355",
    bg: "linear-gradient(135deg, #a30823 0%, #CF0A2C 100%)",
    textColor: "#fff",
    market: "3%",
    phones: "380",
  },
];

const FILTERS = ["All", "Global Giants", "Chinese Brands", "Others"];

const REGION_MAP: Record<string, string[]> = {
  "Global Giants": ["Apple", "Samsung", "Google", "Sony", "Motorola"],
  "Chinese Brands": ["Xiaomi", "OnePlus", "Realme", "Vivo", "Oppo", "Honor", "Huawei"],
  "Others": ["Nothing", "Asus"],
};

export function BrandsRow() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const visibleBrands =
    activeFilter === "All"
      ? BRANDS
      : BRANDS.filter((b) => REGION_MAP[activeFilter]?.includes(b.name));

  return (
    <section
      className="py-20 w-full"
      style={{ background: "var(--color-page-bg)" }}
    >
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p
              className="text-[12px] font-[800] uppercase tracking-[0.16em] mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Brands
            </p>
            <h2
              className="text-[32px] font-[900] tracking-tight leading-tight"
              style={{ color: "var(--color-text-1)" }}
            >
              All Major Brands
            </h2>
            <p
              className="text-[15px] mt-1 font-[500]"
              style={{ color: "var(--color-text-3)" }}
            >
              {BRANDS.length} brands indexed with full specs & pricing
            </p>
          </div>

          <Link
            href="/brands"
            className="flex items-center gap-2 text-[14px] font-[700] transition-all duration-300 self-start sm:self-auto"
            style={{ color: "var(--color-primary)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.gap = "10px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.gap = "8px";
            }}
          >
            <Globe className="h-4 w-4" />
            Explore all brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-[700] transition-all duration-300"
              style={{
                background:
                  activeFilter === f
                    ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
                    : "var(--color-surface)",
                color:
                  activeFilter === f ? "#fff" : "var(--color-text-3)",
                border: `1.5px solid ${activeFilter === f ? "transparent" : "var(--color-border)"}`,
                boxShadow:
                  activeFilter === f
                    ? "0 4px 12px rgba(124,58,237,0.3)"
                    : "none",
                transform: activeFilter === f ? "translateY(-1px)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {visibleBrands.map((brand) => {
            const isHovered = hoveredBrand === brand.name;
            return (
              <Link
                key={brand.name}
                href={`/brands/${brand.slug}`}
                className="group relative flex flex-col items-center gap-0 overflow-hidden rounded-[20px] transition-all duration-400"
                style={{
                  background: isHovered ? brand.bg : "var(--color-surface)",
                  border: `1.5px solid ${isHovered ? "transparent" : "var(--color-border)"}`,
                  boxShadow: isHovered
                    ? `0 12px 32px ${brand.color}44, 0 4px 12px rgba(0,0,0,0.12)`
                    : "0 1px 3px rgba(0,0,0,0.05)",
                  transform: isHovered ? "translateY(-6px) scale(1.03)" : "none",
                }}
                onMouseEnter={() => setHoveredBrand(brand.name)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                {/* Emoji / Logo area */}
                <div
                  className="w-full flex items-center justify-center py-6 text-[36px] transition-all duration-300"
                  style={{
                    background: isHovered
                      ? "rgba(255,255,255,0.08)"
                      : "var(--color-surface-2)",
                  }}
                >
                  <span
                    style={{
                      filter: isHovered ? "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" : "none",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                      display: "inline-block",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                    }}
                  >
                    {brand.emoji}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 w-full text-center">
                  <p
                    className="text-[13px] font-[800] leading-tight transition-colors duration-300"
                    style={{
                      color: isHovered ? brand.textColor : "var(--color-text-1)",
                    }}
                  >
                    {brand.name}
                  </p>
                  <p
                    className="text-[10px] font-[500] mt-0.5 transition-colors duration-300 truncate"
                    style={{
                      color: isHovered
                        ? `${brand.textColor}aa`
                        : "var(--color-text-4)",
                    }}
                  >
                    {brand.tagline}
                  </p>

                  {/* Stats bar on hover */}
                  <div
                    className="mt-2 flex items-center justify-center gap-2 transition-all duration-300"
                    style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? "translateY(0)" : "translateY(4px)" }}
                  >
                    <span
                      className="text-[10px] font-[700] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        color: brand.textColor,
                      }}
                    >
                      {brand.phones} phones
                    </span>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-[3px] w-full transition-all duration-300"
                  style={{
                    background: isHovered ? "rgba(255,255,255,0.3)" : brand.color,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-8 rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.06))",
            border: "1.5px solid rgba(124,58,237,0.15)",
          }}
        >
          <div>
            <p
              className="text-[16px] font-[800]"
              style={{ color: "var(--color-text-1)" }}
            >
              Can&apos;t find your brand?
            </p>
            <p
              className="text-[13px] font-[500]"
              style={{ color: "var(--color-text-3)" }}
            >
              We index {BRANDS.length}+ brands with complete specs, pricing & comparisons.
            </p>
          </div>
          <Link
            href="/brands"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-[14px] text-[14px] font-[800] text-white transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
            }}
          >
            View all {BRANDS.length} brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

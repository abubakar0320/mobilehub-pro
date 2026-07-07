"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import {
  Star,
  ArrowRight,
  Zap,
  Battery,
  Cpu,
  Camera,
  ExternalLink,
  TrendingUp,
  Check,
  BarChart2,
} from "lucide-react";
import { fetcher, PhoneData } from "@/lib/phones";
import { useCompare } from "@/hooks/useCompare";

/* ─── single phone card ─── */
function LatestPhoneCard({
  phone,
  index,
}: {
  phone: PhoneData;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const { addPhone, removePhone, isAdded } = useCompare();
  const added = isAdded(phone._id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      removePhone(phone._id);
    } else {
      addPhone({ id: phone._id, name: phone.model, image: phone.images.main });
    }
  };

  const badgeLabel =
    phone.badges?.includes("new")
      ? "New"
      : phone.badges?.includes("hot")
      ? "Hot 🔥"
      : phone.releaseYear === 2025
      ? "2025"
      : null;

  const isNew = phone.badges?.includes("new") || phone.releaseYear === 2025;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="group relative flex flex-col rounded-[22px] overflow-hidden transition-all duration-400"
      style={{
        background: "var(--color-surface)",
        border: "1.5px solid var(--color-border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(124,58,237,0.5)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-border)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 4px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {/* Image area */}
      <div
        className="relative h-[200px] flex items-center justify-center overflow-hidden"
        style={{ background: "var(--color-surface-2)" }}
      >
        {/* Badge */}
        {badgeLabel && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-[800] uppercase tracking-wider z-10"
            style={{
              background: isNew
                ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
                : "linear-gradient(135deg, #e11d48, #fb7185)",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {badgeLabel}
          </div>
        )}

        {/* Compare button */}
        <button
          onClick={handleCompare}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          title={added ? "Remove from compare" : "Add to compare"}
          style={{
            background: added
              ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
              : "var(--color-surface)",
            border: `1.5px solid ${added ? "transparent" : "var(--color-border)"}`,
            color: added ? "#fff" : "var(--color-text-4)",
            boxShadow: added ? "0 2px 8px rgba(124,58,237,0.3)" : "none",
          }}
        >
          {added ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <BarChart2 className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Phone image */}
        <div className="relative w-[130px] h-[160px] transition-transform duration-500 group-hover:scale-110">
          {!imgError ? (
            <Image
              src={phone.images.main}
              alt={phone.model}
              fill
              className="object-contain drop-shadow-lg"
              sizes="130px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl"
              style={{ color: "var(--color-text-4)" }}
            >
              📱
            </div>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand */}
        <span
          className="text-[10px] font-[800] uppercase tracking-[0.12em] mb-1"
          style={{ color: "var(--color-text-4)" }}
        >
          {phone.brand}
        </span>

        {/* Model name */}
        <h3
          className="text-[15px] font-[800] leading-tight mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-violet-600"
          style={{ color: "var(--color-text-1)" }}
        >
          {phone.model}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3"
                style={{
                  color:
                    i < Math.round(phone.rating.average)
                      ? "var(--color-star)"
                      : "var(--color-border)",
                  fill:
                    i < Math.round(phone.rating.average)
                      ? "var(--color-star)"
                      : "transparent",
                }}
              />
            ))}
          </div>
          <span
            className="text-[12px] font-[600]"
            style={{ color: "var(--color-text-3)" }}
          >
            {phone.rating.average.toFixed(1)}{" "}
            <span style={{ color: "var(--color-text-4)" }}>
              ({phone.rating.count.toLocaleString()})
            </span>
          </span>
        </div>

        {/* Quick specs chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            { icon: Cpu, text: `${phone.specs.ram}GB RAM` },
            { icon: Battery, text: `${phone.specs.batteryDeep.capacity}mAh` },
            { icon: Camera, text: `${phone.specs.cameraDeep.main.mp}MP` },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-[600]"
              style={{
                background: "var(--color-surface-2)",
                color: "var(--color-text-3)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Icon className="h-3 w-3" />
              {text}
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-4">
          <span
            className="text-[20px] font-[900]"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Rs. {(phone.price.usd * 280).toLocaleString()}
          </span>
          {phone.price.original && (
            <span
              className="text-[13px] font-[500] line-through mb-0.5"
              style={{ color: "var(--color-text-4)" }}
            >
              ${phone.price.original}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <div
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[12px] text-[13px] font-[800] text-white transition-all duration-300 group-hover:gap-3"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
            }}
          >
            View Details
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── PhoneGrid section ─── */
export function PhoneGrid() {
  const [sortBy, setSortBy] = useState<"newest" | "rating" | "popularity">(
    "newest"
  );

  const { data, isLoading } = useSWR(
    `/api/phones?sort=${sortBy}&limit=8`,
    fetcher
  );
  const phones: PhoneData[] = data?.phones || [];

  const SORT_OPTIONS = [
    { id: "newest", label: "Latest First" },
    { id: "popularity", label: "Most Popular" },
    { id: "rating", label: "Top Rated" },
  ] as const;

  return (
    <section className="py-20 w-full" style={{ background: "var(--color-surface-2)" }}>
      <div className="container mx-auto px-5 max-w-7xl">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p
              className="text-[12px] font-[800] uppercase tracking-[0.16em] mb-2 flex items-center gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Latest Launches
            </p>
            <h2
              className="text-[32px] font-[900] tracking-tight leading-tight"
              style={{ color: "var(--color-text-1)" }}
            >
              Freshest Phones
            </h2>
            <p
              className="text-[15px] mt-1 font-[500]"
              style={{ color: "var(--color-text-3)" }}
            >
              Just released — click any card to see full specs & details
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort pills */}
            <div className="flex gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className="px-3 py-1.5 rounded-full text-[12px] font-[700] transition-all duration-300"
                  style={{
                    background:
                      sortBy === opt.id
                        ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
                        : "var(--color-surface)",
                    color: sortBy === opt.id ? "#fff" : "var(--color-text-3)",
                    border: `1.5px solid ${sortBy === opt.id ? "transparent" : "var(--color-border)"}`,
                    boxShadow:
                      sortBy === opt.id
                        ? "0 4px 12px rgba(124,58,237,0.3)"
                        : "none",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[22px] overflow-hidden animate-pulse"
                style={{ background: "var(--color-surface)", height: 380 }}
              >
                <div
                  className="h-[200px]"
                  style={{ background: "var(--color-surface-2)" }}
                />
                <div className="p-4 flex flex-col gap-2">
                  <div
                    className="h-3 rounded-full w-1/3"
                    style={{ background: "var(--color-surface-2)" }}
                  />
                  <div
                    className="h-4 rounded-full w-3/4"
                    style={{ background: "var(--color-surface-2)" }}
                  />
                  <div
                    className="h-4 rounded-full w-1/2"
                    style={{ background: "var(--color-surface-2)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {phones.map((phone, i) => (
              <LatestPhoneCard key={phone._id} phone={phone} index={i} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/phones"
            className="flex items-center gap-3 px-8 py-4 rounded-[16px] text-[15px] font-[800] text-white transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 28px rgba(124,58,237,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(124,58,237,0.3)";
            }}
          >
            <Zap className="h-5 w-5" />
            Browse all phones
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

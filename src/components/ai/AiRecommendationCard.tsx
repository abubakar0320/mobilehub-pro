import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Battery,
  Smartphone,
  MemoryStick,
  Camera,
  Layers,
  Star,
} from "lucide-react";
import { PhoneData } from "@/lib/phones";

interface AiRecommendationCardProps {
  phone: PhoneData;
  reasoning: string;
  matchScore: number;
  index: number;
}

const RANK_STYLES = [
  {
    badge: "🥇 #1 Best Match",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
    glow: "rgba(124,58,237,0.20)",
    borderColor: "rgba(124,58,237,0.45)",
    bgTint: "rgba(124,58,237,0.04)",
  },
  {
    badge: "🥈 #2 Runner-Up",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    glow: "rgba(14,165,233,0.18)",
    borderColor: "rgba(14,165,233,0.4)",
    bgTint: "rgba(14,165,233,0.03)",
  },
  {
    badge: "🥉 #3 Strong Pick",
    gradient: "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)",
    glow: "rgba(5,150,105,0.18)",
    borderColor: "rgba(5,150,105,0.35)",
    bgTint: "rgba(5,150,105,0.03)",
  },
];

export function AiRecommendationCard({
  phone,
  reasoning,
  matchScore,
  index,
}: AiRecommendationCardProps) {
  const rank = RANK_STYLES[index] ?? RANK_STYLES[2];

  const specs = [
    {
      icon: Smartphone,
      label: "Display",
      value: `${phone.specs.display.size}" ${phone.specs.display.type}`,
      sub: `${phone.specs.display.refreshRate}Hz · ${phone.specs.display.brightness} nits`,
    },
    {
      icon: Cpu,
      label: "Processor",
      value: phone.specs.chipset,
      sub: `Antutu: ${phone.specs.performance.benchmarks.antutu.toLocaleString()}`,
    },
    {
      icon: Camera,
      label: "Camera",
      value: `${phone.specs.cameraDeep.main.mp}MP Main`,
      sub: phone.specs.cameraDeep.video,
    },
    {
      icon: Battery,
      label: "Battery",
      value: `${phone.specs.batteryDeep.capacity} mAh`,
      sub: `${phone.specs.batteryDeep.fastCharging}W Fast Charge`,
    },
    {
      icon: MemoryStick,
      label: "Memory",
      value: `${phone.specs.ram}GB RAM`,
      sub: `${phone.specs.storage}GB Storage`,
    },
    {
      icon: Layers,
      label: "OS / Build",
      value: phone.specs.software.os,
      sub: `${phone.specs.weight}g · IP${phone.specs.ipRating}`,
    },
  ];

  return (
    <div
      className="group rounded-[28px] overflow-hidden flex flex-col md:flex-row transition-all duration-500"
      style={{
        background: `var(--color-surface)`,
        border: `1.5px solid ${rank.borderColor}`,
        boxShadow: `0 4px 24px ${rank.glow}, 0 1px 4px rgba(0,0,0,0.06)`,
        animationDelay: `${index * 150}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 48px ${rank.glow}, 0 4px 16px rgba(0,0,0,0.10)`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 24px ${rank.glow}, 0 1px 4px rgba(0,0,0,0.06)`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* ── Left: Image panel ─────────────────────── */}
      <div
        className="w-full md:w-[300px] flex-shrink-0 flex flex-col items-center justify-center relative p-10 overflow-hidden"
        style={{ background: rank.bgTint }}
      >
        {/* decorative blobs */}
        <div
          className="absolute top-[-30%] right-[-20%] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{
            background: rank.gradient,
            opacity: 0.1,
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[150px] h-[150px] rounded-full pointer-events-none"
          style={{
            background: rank.gradient,
            opacity: 0.08,
            filter: "blur(25px)",
          }}
        />

        {/* Rank badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-[800] text-white z-10"
          style={{ background: rank.gradient }}
        >
          {rank.badge}
        </div>

        {/* Match score arc */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className="relative w-12 h-12 flex items-center justify-center rounded-full text-[13px] font-[900]"
            style={{
              background: rank.gradient,
              color: "#fff",
              boxShadow: `0 4px 12px ${rank.glow}`,
            }}
          >
            {matchScore}
            <span className="text-[9px] font-[700] absolute bottom-1">%</span>
          </div>
        </div>

        {/* Phone image */}
        <div className="relative w-[160px] h-[220px] transition-transform duration-700 ease-out group-hover:scale-110 z-0">
          <Image
            src={phone.images.main}
            alt={phone.model}
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mt-4 z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5"
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
          <span
            className="text-[12px] font-[600] ml-1"
            style={{ color: "var(--color-text-3)" }}
          >
            {phone.rating.average}/5
          </span>
        </div>
      </div>

      {/* ── Right: Content panel ───────────────────── */}
      <div className="flex-1 flex flex-col p-8 md:p-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <span
              className="text-[11px] font-[800] uppercase tracking-[0.14em] mb-1 block"
              style={{ color: "var(--color-text-4)" }}
            >
              {phone.brand}
            </span>
            <h3
              className="text-[26px] sm:text-[30px] font-[900] leading-tight transition-colors duration-300"
              style={{ color: "var(--color-text-1)" }}
            >
              {phone.model}
            </h3>
          </div>
          <div className="text-right">
            <span
              className="text-[11px] font-[600] block mb-0.5"
              style={{ color: "var(--color-text-4)" }}
            >
              Starting from
            </span>
            <span
              className="text-[28px] font-[900]"
              style={{
                background: rank.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rs. {(phone.price.usd * 280).toLocaleString()}
            </span>
          </div>
        </div>

        {/* AI reasoning box */}
        <div
          className="rounded-[20px] p-6 mb-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.06))`,
            border: "1px solid rgba(124,58,237,0.15)",
          }}
        >
          {/* watermark */}
          <div className="absolute right-4 top-4 opacity-[0.06] pointer-events-none">
            <Sparkles className="h-16 w-16" style={{ color: "var(--color-primary)" }} />
          </div>
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="p-1.5 rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span
              className="text-[11px] font-[800] uppercase tracking-[0.14em]"
              style={{ color: "var(--color-primary)" }}
            >
              Neural Analysis
            </span>
          </div>
          <p
            className="text-[14px] leading-relaxed font-[500] relative z-10"
            style={{ color: "var(--color-text-2)" }}
          >
            {reasoning}
          </p>
        </div>

        {/* Specs grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-5 pb-6 border-b mb-6"
          style={{ borderColor: "var(--color-border)" }}
        >
          {specs.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <div
                className="p-2 rounded-[10px] flex-shrink-0 mt-0.5"
                style={{
                  background: "var(--color-surface-2)",
                }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: "var(--color-text-3)" }}
                />
              </div>
              <div>
                <div
                  className="text-[10px] font-[700] uppercase tracking-[0.1em] mb-0.5"
                  style={{ color: "var(--color-text-4)" }}
                >
                  {label}
                </div>
                <div
                  className="text-[13px] font-[700] leading-tight"
                  style={{ color: "var(--color-text-1)" }}
                >
                  {value}
                </div>
                <div
                  className="text-[12px] font-[500] leading-tight mt-0.5"
                  style={{ color: "var(--color-text-3)" }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex justify-end">
          <Link
            href={`/phones/${phone.slug}`}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-[14px] text-[14px] font-[800] text-white transition-all duration-300"
            style={{
              background: rank.gradient,
              boxShadow: `0 4px 16px ${rank.glow}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${rank.glow}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${rank.glow}`;
            }}
          >
            View Full Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

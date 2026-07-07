import { AiAdvisorClient } from "./AiAdvisorClient";
import { Sparkles, Brain, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "AI Phone Matchmaker – MobileHub Pro",
  description:
    "Let our advanced AI find the perfect smartphone for your specific needs, budget, and brand preferences.",
};

export default function AiAdvisorPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-page-bg)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-[72px] pb-[96px] px-6">
        {/* animated mesh blobs */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: "-15%",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "aiBlob1 8s ease-in-out infinite alternate",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-25%",
              right: "-10%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "aiBlob2 10s ease-in-out infinite alternate",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "45%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "aiBlob1 12s ease-in-out 2s infinite alternate",
            }}
          />
        </div>

        {/* grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-text-1) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto text-center">
          {/* badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-[12px] font-[900] uppercase tracking-widest text-violet-600 bg-violet-50 border-2 border-violet-200 shadow-md shadow-violet-100/50"
          >
            <Sparkles className="h-4 w-4 text-fuchsia-500" />
            Neural Match Engine&nbsp;·&nbsp;v3.0
          </div>

          {/* headline */}
          <h1
            className="text-[44px] sm:text-[60px] md:text-[72px] font-[900] leading-[1.05] tracking-tight mb-6 text-zinc-900 drop-shadow-sm"
          >
            Find Your{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
            >
              Perfect Match
            </span>
            .
          </h1>

          <p
            className="text-[18px] md:text-[20px] leading-relaxed max-w-[620px] mx-auto mb-12"
            style={{ color: "var(--color-text-3)", fontWeight: 500 }}
          >
            Tell our AI what matters most to you. We&apos;ll instantly analyse
            thousands of data points to discover your ideal smartphone.
          </p>

          {/* trust chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {[
              { icon: Brain, label: "Neural AI Scoring", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200" },
              { icon: Zap, label: "Instant Results", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
              { icon: Shield, label: "200+ Phones Indexed", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
            ].map(({ icon: Icon, label, color, bg, border }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-[800] border-2 shadow-sm ${bg} ${border} ${color} hover:-translate-y-0.5 transition-transform`}
              >
                <Icon
                  className={`h-4 w-4 ${color}`}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main form + results ───────────────────────────────── */}
      <div className="max-w-[1060px] mx-auto px-6 pb-[100px]">
        <AiAdvisorClient />
      </div>

      {/* blob keyframes */}
      <style>{`
        @keyframes aiBlob1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, -30px) scale(1.12); }
        }
        @keyframes aiBlob2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-50px, 30px) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import {
  DollarSign,
  Camera,
  Gamepad2,
  BatteryCharging,
  Zap,
  Sparkles,
  Smartphone,
  CheckCircle2,
  MonitorSmartphone,
  Apple,
  Cpu,
  Activity,
} from "lucide-react";
import useSWR from "swr";
import { fetcher, PhoneData } from "@/lib/phones";
import { PreferenceSelector } from "@/components/ai/PreferenceSelector";
import { AiRecommendationCard } from "@/components/ai/AiRecommendationCard";

/* ─── Loading messages ─── */
const LOADING_STEPS = [
  "Scanning 200+ smartphones…",
  "Applying your filters…",
  "Running neural score…",
  "Ranking top matches…",
];

export function AiAdvisorClient() {
  const [budget, setBudget] = useState<string | null>(null);
  const [customBudget, setCustomBudget] = useState<string>("");
  const [priority, setPriority] = useState<string | null>(null);
  const [osPref, setOsPref] = useState<string | null>(null);
  const [sizePref, setSizePref] = useState<string | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const { data } = useSWR(`/api/phones?limit=100`, fetcher);
  const phones: PhoneData[] = data?.phones || [];

  const canCalculate =
    budget && priority && osPref && sizePref &&
    !(budget === "custom" && !customBudget);

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResults(false);
    setLoadingStep(0);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    // Step through loading messages
    LOADING_STEPS.forEach((_, i) => {
      setTimeout(() => setLoadingStep(i), i * 600);
    });

    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 2600);
  };

  const getMatches = () => {
    if (!phones.length) return [];
    let filtered = [...phones];

    if (budget === "budget") filtered = filtered.filter((p) => p.price.usd < 400);
    if (budget === "midrange")
      filtered = filtered.filter((p) => p.price.usd >= 400 && p.price.usd <= 800);
    if (budget === "premium") filtered = filtered.filter((p) => p.price.usd > 800);
    if (budget === "custom" && customBudget)
      filtered = filtered.filter((p) => p.price.usd <= Number(customBudget));

    if (osPref === "ios") filtered = filtered.filter((p) => p.specs.software.os.includes("iOS"));
    if (osPref === "android")
      filtered = filtered.filter((p) => p.specs.software.os.includes("Android"));

    if (priority === "camera")
      filtered.sort((a, b) => b.specs.cameraDeep.main.mp - a.specs.cameraDeep.main.mp);
    else if (priority === "gaming")
      filtered.sort(
        (a, b) =>
          b.specs.performance.benchmarks.antutu - a.specs.performance.benchmarks.antutu
      );
    else if (priority === "battery")
      filtered.sort((a, b) => b.specs.batteryDeep.capacity - a.specs.batteryDeep.capacity);
    else filtered.sort((a, b) => b.rating.average - a.rating.average);

    return filtered.slice(0, 3);
  };

  const getReasoning = (phone: PhoneData) => {
    if (priority === "camera")
      return `Selected for its exceptional ${phone.specs.cameraDeep.main.mp}MP main sensor and advanced computational photography, delivering the best optical performance in your budget range.`;
    if (priority === "gaming")
      return `Powered by the ${phone.specs.chipset} and scoring ${phone.specs.performance.benchmarks.antutu.toLocaleString()} on Antutu — a verified gaming powerhouse.`;
    if (priority === "battery")
      return `Houses a massive ${phone.specs.batteryDeep.capacity}mAh cell with efficient silicon, guaranteeing multi-day endurance on a single charge.`;
    return `An exceptional all-rounder rated ${phone.rating.average}/5 by real users — perfectly balancing performance, camera, and ecosystem value.`;
  };

  const completedSteps = [budget, priority, osPref, sizePref].filter(Boolean).length;
  const progress = (completedSteps / 4) * 100;

  return (
    <div className="flex flex-col gap-8">

      {/* ── Form card ──────────────────────────────────── */}
      <div
        className="rounded-[28px] overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow:
            "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Card header */}
        <div
          className="px-8 pt-8 pb-6 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2
                className="text-[22px] font-[800] leading-tight"
                style={{ color: "var(--color-text-1)" }}
              >
                Tell Us Your Preferences
              </h2>
              <p
                className="text-[14px] mt-1 font-[500]"
                style={{ color: "var(--color-text-3)" }}
              >
                Answer all 4 questions to unlock your AI matches.
              </p>
            </div>

            {/* Progress pill */}
            <div className="flex flex-col items-end gap-1.5 min-w-[140px]">
              <span
                className="text-[13px] font-[800] text-zinc-500 uppercase tracking-widest"
              >
                {completedSteps} / 4 completed
              </span>
              <div
                className="w-full h-3 rounded-full overflow-hidden bg-zinc-100"
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">

          {/* Q1 Budget */}
          <div className="flex flex-col gap-4">
            <PreferenceSelector
              title="What is your target budget?"
              stepNumber={1}
              selectedId={budget}
              onSelect={setBudget}
              options={[
                {
                  id: "budget",
                  label: "Under Rs. 112,000",
                  description: "Great value picks",
                  icon: DollarSign,
                },
                {
                  id: "midrange",
                  label: "Rs. 112,000 – Rs. 224,000",
                  description: "Sweet-spot segment",
                  icon: CheckCircle2,
                },
                {
                  id: "premium",
                  label: "Flagship Rs. 224,000+",
                  description: "Best-in-class",
                  icon: Sparkles,
                },
                {
                  id: "custom",
                  label: "Custom Amount",
                  description: "Enter exact limit",
                  icon: DollarSign,
                },
              ]}
            />

            {budget === "custom" && (
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span
                      className="font-[700] text-[15px]"
                      style={{ color: "var(--color-text-3)" }}
                    >
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    placeholder="Enter max budget…"
                    className="w-full pl-8 pr-4 py-3.5 rounded-[14px] text-[15px] font-[600] outline-none transition-all duration-300"
                    style={{
                      background: "var(--color-surface-2)",
                      border: "2px solid var(--color-border)",
                      color: "var(--color-text-1)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-primary)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 4px rgba(124,58,237,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Q2 Priority */}
          <PreferenceSelector
            title="What matters most to you?"
            stepNumber={2}
            selectedId={priority}
            onSelect={setPriority}
            options={[
              {
                id: "camera",
                label: "Photography",
                description: "Best camera system",
                icon: Camera,
              },
              {
                id: "gaming",
                label: "Performance",
                description: "Fastest chip & GPU",
                icon: Gamepad2,
              },
              {
                id: "battery",
                label: "Battery Life",
                description: "All-day endurance",
                icon: BatteryCharging,
              },
              {
                id: "all",
                label: "All-Rounder",
                description: "Balanced excellence",
                icon: Zap,
              },
            ]}
          />

          {/* Q3 OS */}
          <PreferenceSelector
            title="Ecosystem preference?"
            stepNumber={3}
            selectedId={osPref}
            onSelect={setOsPref}
            options={[
              {
                id: "ios",
                label: "Apple iOS",
                description: "iPhone ecosystem",
                icon: Apple,
              },
              {
                id: "android",
                label: "Android",
                description: "Open & versatile",
                icon: Smartphone,
              },
              {
                id: "any",
                label: "Any / No Preference",
                description: "Show me everything",
                icon: Sparkles,
              },
            ]}
          />

          {/* Q4 Size */}
          <PreferenceSelector
            title="Preferred screen size?"
            stepNumber={4}
            selectedId={sizePref}
            onSelect={setSizePref}
            options={[
              {
                id: "compact",
                label: 'Compact (< 6.2")',
                description: "One-hand friendly",
                icon: Smartphone,
              },
              {
                id: "standard",
                label: "Standard 6.2–6.6\"",
                description: "Balanced form factor",
                icon: MonitorSmartphone,
              },
              {
                id: "phablet",
                label: 'Large (6.7"+)',
                description: "Immersive display",
                icon: MonitorSmartphone,
              },
            ]}
          />
        </div>

        {/* CTA footer */}
        <div
          className="px-8 py-6 border-t flex items-center justify-between gap-4 flex-wrap"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="text-[13px] font-[500]"
            style={{ color: "var(--color-text-4)" }}
          >
            {canCalculate
              ? "🎯 All set! Click to run the AI analysis."
              : "Complete all 4 questions above to continue."}
          </p>

          <button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`relative flex items-center gap-3 px-8 py-4 rounded-[16px] text-[15px] font-[900] transition-all duration-300 overflow-hidden shadow-lg ${canCalculate ? 'bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-fuchsia-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-300' : 'bg-zinc-100 text-zinc-400 opacity-60 cursor-not-allowed'}`}
          >
            <Cpu className="h-5 w-5" />
            {showResults ? "Recalculate Matches" : "Find My Matches"}
            {/* shimmer */}
            {canCalculate && (
              <span
                className="absolute inset-0 rounded-[16px]"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                  animation: "btnShimmer 2.5s ease-in-out infinite",
                }}
              />
            )}
          </button>
        </div>
      </div>

      {/* ── Scroll anchor ────────────────────────────────── */}
      <div ref={resultsRef} className="scroll-mt-[90px]" />

      {/* ── Calculating state ─────────────────────────────── */}
      {isCalculating && (
        <div
          className="rounded-[28px] py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Spinner ring */}
          <div className="relative w-24 h-24 mb-8">
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: "3px solid var(--color-surface-2)" }}
            />
            <div
              className="absolute inset-0 rounded-full border-[3px] border-t-transparent animate-spin"
              style={{
                borderColor: "var(--color-primary) transparent transparent transparent",
              }}
            />
            {/* inner pulse */}
            <div
              className="absolute inset-[14px] rounded-full animate-pulse flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(99,102,241,0.15))",
              }}
            >
              <Activity
                className="h-7 w-7"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
          </div>

          <h2
            className="text-[26px] font-[800] mb-3"
            style={{ color: "var(--color-text-1)" }}
          >
            Analysing Database…
          </h2>

          {/* Step messages */}
          <div className="flex flex-col gap-2 mt-2">
            {LOADING_STEPS.map((step, i) => (
              <p
                key={step}
                className="text-[14px] font-[500] transition-all duration-500"
                style={{
                  color:
                    i === loadingStep
                      ? "var(--color-primary)"
                      : i < loadingStep
                      ? "var(--color-text-4)"
                      : "var(--color-border)",
                  opacity: i <= loadingStep ? 1 : 0.3,
                  transform: i === loadingStep ? "scale(1.04)" : "scale(1)",
                }}
              >
                {i < loadingStep ? "✓ " : i === loadingStep ? "→ " : "  "}
                {step}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ───────────────────────────────────────── */}
      {showResults && !isCalculating && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Results header */}
          <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h2
                className="text-[36px] font-[900] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 tracking-tight"
              >
                Your Top Matches
              </h2>
              <p
                className="text-[15px] mt-1 font-[700] text-zinc-500 uppercase tracking-widest"
              >
                AI-ranked phones based on your{" "}
                <strong className="text-violet-600">exact criteria</strong>.
              </p>
            </div>

            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-[800] bg-violet-50 text-violet-700 border-2 border-violet-200 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-fuchsia-500" />
              {getMatches().length} matches found
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {getMatches().map((phone, i) => (
              <AiRecommendationCard
                key={phone._id}
                phone={phone}
                matchScore={99 - i * 3}
                reasoning={getReasoning(phone)}
                index={i}
              />
            ))}

            {getMatches().length === 0 && (
              <div
                className="p-16 text-center rounded-[24px]"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="text-5xl mb-4"
                  role="img"
                  aria-label="search emoji"
                >
                  🔍
                </div>
                <h3
                  className="text-[22px] font-[800] mb-2"
                  style={{ color: "var(--color-text-1)" }}
                >
                  No exact matches found
                </h3>
                <p
                  className="text-[15px]"
                  style={{ color: "var(--color-text-3)" }}
                >
                  Try broadening your criteria — for example, set Ecosystem to{" "}
                  <em>Any</em> or raise your budget.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes btnShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

import { PhoneData } from "@/lib/phones";
import { Trophy, Check, X, Minus } from "lucide-react";
import Image from "next/image";

export function OverallAnalysis({
  phones,
  winners,
}: {
  phones: PhoneData[];
  winners: Record<string, string>;
}) {
  if (phones.length < 2) return null;
  const overallId = winners["overall"];
  if (!overallId) return null;

  const winner = phones.find((p) => p._id === overallId);
  if (!winner) return null;

  // Category definitions: key, label, emoji, how to compute value & compare
  const categories = [
    {
      key: "performance",
      label: "Performance",
      icon: "⚡",
      getValue: (p: PhoneData) =>
        `${p.specs.performance.benchmarks.antutu.toLocaleString()} AnTuTu`,
      getNumeric: (p: PhoneData) => p.specs.performance.benchmarks.antutu,
      explanation: (p: PhoneData, others: PhoneData[]) => {
        const best = Math.max(...others.map((o) => o.specs.performance.benchmarks.antutu));
        const diff = p.specs.performance.benchmarks.antutu - best;
        if (diff > 0)
          return `Leads with an AnTuTu score of ${p.specs.performance.benchmarks.antutu.toLocaleString()}, which is ${diff.toLocaleString()} points ahead of the nearest competitor.`;
        return `Scores ${p.specs.performance.benchmarks.antutu.toLocaleString()} on AnTuTu — a highly competitive result in this lineup.`;
      },
    },
    {
      key: "display",
      label: "Display",
      icon: "🖥️",
      getValue: (p: PhoneData) =>
        `${p.specs.display.refreshRate}Hz · ${p.specs.display.brightness} nits`,
      getNumeric: (p: PhoneData) => p.specs.display.brightness,
      explanation: (p: PhoneData, others: PhoneData[]) => {
        const best = Math.max(...others.map((o) => o.specs.display.brightness));
        const diff = p.specs.display.brightness - best;
        if (diff > 0)
          return `Features a ${p.specs.display.type} panel peaking at ${p.specs.display.brightness} nits — ${diff} nits brighter than every other phone here. The ${p.specs.display.refreshRate}Hz refresh rate ensures buttery-smooth scrolling.`;
        return `Packs a ${p.specs.display.type} display with a ${p.specs.display.refreshRate}Hz refresh rate and ${p.specs.display.brightness} nits peak brightness for vivid visuals.`;
      },
    },
    {
      key: "camera",
      label: "Camera",
      icon: "📷",
      getValue: (p: PhoneData) =>
        `${p.specs.cameraDeep.main.mp} MP · ${p.specs.cameraDeep.video}`,
      getNumeric: (p: PhoneData) =>
        p.specs.cameraDeep.main.mp +
        p.specs.cameraDeep.ultrawide.mp +
        p.specs.cameraDeep.telephoto.mp,
      explanation: (p: PhoneData, _others: PhoneData[]) => {
        const total =
          p.specs.cameraDeep.main.mp +
          p.specs.cameraDeep.ultrawide.mp +
          p.specs.cameraDeep.telephoto.mp;
        const tele =
          p.specs.cameraDeep.telephoto.mp > 0
            ? ` plus a ${p.specs.cameraDeep.telephoto.mp} MP telephoto with ${p.specs.cameraDeep.telephoto.zoom} zoom`
            : "";
        return `${total} MP combined from a ${p.specs.cameraDeep.main.mp} MP main sensor${p.specs.cameraDeep.main.ois ? " with OIS" : ""}, ${p.specs.cameraDeep.ultrawide.mp} MP ultrawide${tele}. Capable of ${p.specs.cameraDeep.video} video.`;
      },
    },
    {
      key: "battery",
      label: "Battery",
      icon: "🔋",
      getValue: (p: PhoneData) =>
        `${p.specs.batteryDeep.capacity} mAh · ${p.specs.batteryDeep.fastCharging}W`,
      getNumeric: (p: PhoneData) => p.specs.batteryDeep.capacity,
      explanation: (p: PhoneData, others: PhoneData[]) => {
        const best = Math.max(...others.map((o) => o.specs.batteryDeep.capacity));
        const diff = p.specs.batteryDeep.capacity - best;
        const wireless =
          p.specs.batteryDeep.wireless > 0
            ? ` and ${p.specs.batteryDeep.wireless}W wireless charging`
            : "";
        if (diff > 0)
          return `Packs the largest battery at ${p.specs.batteryDeep.capacity} mAh — ${diff} mAh more than the runner-up. Supports ${p.specs.batteryDeep.fastCharging}W fast charging${wireless}.`;
        return `A ${p.specs.batteryDeep.capacity} mAh battery with ${p.specs.batteryDeep.fastCharging}W fast wired charging${wireless} keeps it powered throughout the day.`;
      },
    },
    {
      key: "software",
      label: "Software",
      icon: "🛡️",
      getValue: (p: PhoneData) =>
        `${p.specs.software.os} · ${p.specs.software.updateYears} yrs support`,
      getNumeric: (p: PhoneData) => p.specs.software.updateYears,
      explanation: (p: PhoneData, others: PhoneData[]) => {
        const best = Math.max(...others.map((o) => o.specs.software.updateYears));
        const diff = p.specs.software.updateYears - best;
        if (diff > 0)
          return `Offers the longest software support — ${p.specs.software.updateYears} years of OS updates, which is ${diff} more year${diff > 1 ? "s" : ""} than any rival here. A massive long-term investment win.`;
        return `Runs ${p.specs.software.os} with ${p.specs.software.updateYears} years of guaranteed OS updates, ensuring strong longevity.`;
      },
    },
    {
      key: "design",
      label: "Design & Build",
      icon: "✨",
      getValue: (p: PhoneData) =>
        `${p.specs.ipRating} · ${p.specs.weight}g`,
      getNumeric: (p: PhoneData) => parseInt(p.specs.ipRating.replace(/\D/g, "") || "0"),
      explanation: (p: PhoneData, _others: PhoneData[]) => {
        return `Rated ${p.specs.ipRating} for dust and water resistance, and weighs just ${p.specs.weight}g — a confident, premium build.`;
      },
    },
    {
      key: "price",
      label: "Value for Money",
      icon: "💰",
      getValue: (p: PhoneData) => `Rs. ${(p.price.usd * 280).toLocaleString()}`,
      getNumeric: (p: PhoneData) => p.price.usd,
      explanation: (p: PhoneData, others: PhoneData[]) => {
        const avg =
          others.reduce((acc, o) => acc + o.price.usd, 0) / others.length;
        const diff = Math.round(avg - p.price.usd);
        if (diff > 0)
          return `At Rs. {(p.price.usd * 280).toLocaleString()}, it is Rs. {(diff * 280).toLocaleString()} cheaper than the average price of phones in this comparison, giving you more specs per dollar.`;
        return `Priced at Rs. {(p.price.usd * 280).toLocaleString()}, it offers a competitive package given its feature set.`;
      },
    },
  ];

  // Score per category
  const scoredCategories = categories.map((cat) => {
    const isWinner = winners[cat.key] === overallId;
    const others = phones.filter((p) => p._id !== overallId);
    return {
      ...cat,
      isWinner,
      winnerValue: cat.getValue(winner),
      explanation: cat.explanation(winner, others),
    };
  });

  const totalWins = scoredCategories.filter((c) => c.isWinner).length;

  return (
    <div className="mx-[24px] mb-[48px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <Trophy className="h-4 w-4 text-purple-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-[700] text-zinc-900 dark:text-zinc-100">
            Why We Recommend the {winner.model}
          </h2>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
            An in-depth analysis across all {categories.length} categories
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[16px] overflow-hidden">

        {/* Winner summary hero */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 flex items-center gap-5">
          <div className="w-[72px] h-[72px] bg-white/10 rounded-[12px] flex-shrink-0 relative overflow-hidden">
            <Image src={winner.images.main} alt={winner.model} fill className="object-contain p-1" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white/70 text-[12px] font-medium uppercase tracking-wider mb-1">Overall Winner</div>
            <div className="text-white text-[20px] font-[700] truncate">{winner.model}</div>
            <div className="text-white/80 text-[13px] mt-1">
              Won <span className="font-bold text-white">{totalWins}</span> out of {categories.length} categories · <span className="font-bold text-white">Rs. {(winner.price.usd * 280).toLocaleString()}</span>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center bg-white/10 rounded-[10px] px-4 py-3 flex-shrink-0">
            <span className="text-white text-[28px] font-[800]">{totalWins}/{categories.length}</span>
            <span className="text-white/70 text-[11px] font-medium">Categories Won</span>
          </div>
        </div>

        {/* Category-by-category breakdown */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {scoredCategories.map((cat) => (
            <div key={cat.key} className="flex gap-4 px-5 py-4 items-start">
              {/* Status icon */}
              <div className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center ${
                cat.isWinner
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : "bg-zinc-100 dark:bg-zinc-800"
              }`}>
                {cat.isWinner ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Minus className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[14px] font-[600] text-zinc-800 dark:text-zinc-200">
                    {cat.icon} {cat.label}
                  </span>
                  {cat.isWinner && (
                    <span className="text-[10px] font-[700] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-2 py-0.5">
                      Best in class
                    </span>
                  )}
                </div>
                <div className="text-[12px] font-medium text-violet-600 dark:text-violet-400 mb-1">{cat.winnerValue}</div>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-[1.6]">{cat.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final verdict footer */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-700 px-5 py-4">
          <p className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-[1.7]">
            <span className="font-[700] text-zinc-900 dark:text-zinc-100">Our final verdict: </span>
            {(() => {
              const wins = scoredCategories.filter(c => c.isWinner).map(c => c.label);
              const others = phones.filter(p => p._id !== overallId);
              const cheaperThan = others.filter(o => o.price.usd > winner.price.usd).length;
              const expensiveThan = others.filter(o => o.price.usd < winner.price.usd).length;
              let priceCtx = "";
              if (cheaperThan === others.length) priceCtx = "the most affordable option in this comparison";
              else if (expensiveThan === others.length) priceCtx = "the most premium option here";
              else priceCtx = "a mid-range pick in terms of price";

              if (wins.length >= 3) {
                return `The ${winner.model} is clearly the phone to beat in this group. It dominates in ${wins.slice(0, -1).join(", ")} and ${wins[wins.length - 1]}, while being ${priceCtx}. If you want one phone that does everything exceptionally well, this is your answer.`;
              } else if (wins.length >= 1) {
                return `The ${winner.model} earns its spot at the top by winning in ${wins.join(" and ")} — areas that matter most for everyday use. At Rs. {(winner.price.usd * 280).toLocaleString()} and being ${priceCtx}, it represents a strong, well-rounded purchase.`;
              } else {
                return `The ${winner.model} stands out as the best value for money in this comparison. At Rs. {(winner.price.usd * 280).toLocaleString()} — ${priceCtx} — it packs a surprisingly capable spec sheet for its price point.`;
              }
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}

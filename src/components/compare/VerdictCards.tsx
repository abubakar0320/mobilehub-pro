import { PhoneData } from "@/lib/phones";

export function VerdictCards({
  phones,
  winners
}: {
  phones: PhoneData[],
  winners: Record<string, string>
}) {
  if (phones.length < 2) return null;

  // Build verdicts
  const verdicts = [];

  // Best Overall
  const bestOverallId = winners['overall'];
  if (bestOverallId) {
    const p = phones.find(x => x._id === bestOverallId);
    if (p) {
      const wonCategories = [];
      if (winners['display'] === bestOverallId) wonCategories.push("Display");
      if (winners['performance'] === bestOverallId) wonCategories.push("Performance");
      if (winners['camera'] === bestOverallId) wonCategories.push("Camera");
      if (winners['battery'] === bestOverallId) wonCategories.push("Battery");
      if (winners['software'] === bestOverallId) wonCategories.push("Software");
      if (winners['design'] === bestOverallId) wonCategories.push("Design");

      let reasonStr = "The best all-rounder smartphone, winning the most categories in this comparison.";
      if (wonCategories.length > 0) {
        if (wonCategories.length === 1) {
          reasonStr = `Chosen as the top overall choice because it dominates in ${wonCategories[0]}, making it a highly compelling option.`;
        } else if (wonCategories.length === 2) {
          reasonStr = `The ultimate all-rounder, securing victories in both ${wonCategories[0]} and ${wonCategories[1]}.`;
        } else {
          const last = wonCategories.pop();
          reasonStr = `An absolute powerhouse that dominates across the board, featuring the best ${wonCategories.join(', ')}, and ${last}.`;
        }
      } else if (winners['price'] === bestOverallId) {
        reasonStr = "Selected as the best overall phone for providing the ultimate balance of high-end specs and incredible value for money.";
      }

      verdicts.push({
        badge: "Overall Winner",
        badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 ring-1 ring-purple-400 dark:ring-purple-500",
        title: p.model,
        reason: reasonStr
      });
    }
  }

  // Best Performance
  const bestPerfId = winners['performance'];
  if (bestPerfId && bestPerfId !== bestOverallId) {
    const p = phones.find(x => x._id === bestPerfId);
    if (p) {
      verdicts.push({
        badge: "Best performance",
        badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
        title: p.model,
        reason: "Highest Geekbench score, fastest processor, and smooth daily performance."
      });
    }
  }

  // Best Value = Winner of Price
  const bestValueId = winners['price'];
  if (bestValueId && bestValueId !== bestPerfId && bestValueId !== bestOverallId) {
    const p = phones.find(x => x._id === bestValueId);
    if (p) {
      verdicts.push({
        badge: "Best value",
        badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        title: p.model,
        reason: "Great specs at lowest price, offering excellent performance per dollar."
      });
    }
  }

  // Best Camera
  const bestCameraId = winners['camera'];
  if (bestCameraId && bestCameraId !== bestPerfId && bestCameraId !== bestValueId && bestCameraId !== bestOverallId) {
    const p = phones.find(x => x._id === bestCameraId);
    if (p) {
      verdicts.push({
        badge: "Best camera",
        badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
        title: p.model,
        reason: "Highest megapixel count across main, ultrawide, and telephoto lenses."
      });
    }
  }

  // Best Battery
  const bestBatteryId = winners['battery'];
  if (verdicts.length < 4 && bestBatteryId && ![bestPerfId, bestValueId, bestCameraId, bestOverallId].includes(bestBatteryId)) {
    const p = phones.find(x => x._id === bestBatteryId);
    if (p) {
      verdicts.push({
        badge: "Best battery",
        badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        title: p.model,
        reason: "Largest battery capacity paired with ultra-fast charging speeds."
      });
    }
  }

  if (verdicts.length === 0) return null;

  return (
    <div className="mx-[24px] mb-[40px]">
      <h2 className="text-[20px] font-[700] text-zinc-900 dark:text-zinc-100 mb-[16px]">Verdicts</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px]`}>
        {verdicts.map((v, i) => (
          <div key={i} className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[12px] p-[16px] text-center flex flex-col items-center">
            <div className={`text-[11px] font-[700] uppercase tracking-wider px-[10px] py-[4px] rounded-[4px] mb-[12px] ${v.badgeColor}`}>
              {v.badge}
            </div>
            <h3 className="text-[14px] font-[600] text-zinc-900 dark:text-zinc-100 mb-[6px]">{v.title}</h3>
            <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-[1.5]">{v.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

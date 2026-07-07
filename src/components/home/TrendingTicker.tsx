export function TrendingTicker() {
  const trendingItems = [
    { rank: "#1", name: "iPhone 16 Pro", change: "+2%" },
    { rank: "#2", name: "Galaxy S25 Ultra", change: "+5%" },
    { rank: "#3", name: "Pixel 9 Pro", change: "+1%" },
    { rank: "#4", name: "OnePlus 13", change: "+8%" },
    { rank: "#5", name: "Xiaomi 15 Pro", change: "+3%" },
    { rank: "#6", name: "Vivo X200 Pro", change: "+12%" },
    { rank: "#7", name: "Nothing Phone 3", change: "New" },
    { rank: "#8", name: "Asus ROG Phone 9", change: "+6%" },
  ];

  return (
    <div className="w-full h-[44px] bg-zinc-950 dark:bg-zinc-900 flex items-center overflow-hidden relative">
      {/* Left badge */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-gradient-to-r from-violet-600 to-indigo-500">
        <span className="text-white font-bold text-[12px] uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5">
          🔥 Trending
        </span>
      </div>
      {/* Fade overlay */}
      <div className="absolute left-[110px] top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 dark:from-zinc-900 to-transparent z-[9]" />

      {/* Marquee */}
      <div className="flex whitespace-nowrap animate-marquee pl-[140px]">
        {[...trendingItems, ...trendingItems, ...trendingItems, ...trendingItems].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-5">
            <span className="text-zinc-600 text-[12px] font-bold">{item.rank}</span>
            <span className="text-zinc-300 text-[13px] font-medium">{item.name}</span>
            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${item.change === 'New' ? 'text-violet-400 bg-violet-950/60' : 'text-emerald-400 bg-emerald-950/40'}`}>{item.change}</span>
            <span className="text-zinc-700">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

const data = [
  { day: "Jun 1", visitors: 4200, pageviews: 8100 },
  { day: "Jun 5", visitors: 3800, pageviews: 7200 },
  { day: "Jun 10", visitors: 5100, pageviews: 9800 },
  { day: "Jun 15", visitors: 4700, pageviews: 9000 },
  { day: "Jun 20", visitors: 6200, pageviews: 12400 },
  { day: "Jun 25", visitors: 5500, pageviews: 10800 },
  { day: "Jun 30", visitors: 7100, pageviews: 14200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[14px] p-3 text-[12px]"
        style={{
          background: "#18181f",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <p className="font-[700] mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{p.name}:</span>
            <span className="font-[700] text-white">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function TrafficChart() {
  return (
    <div
      className="rounded-[20px] p-6 h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[16px] font-[800] text-white mb-1">Traffic Overview</h3>
          <p className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Last 30 days — visitors &amp; pageviews
          </p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((t, i) => (
            <button
              key={t}
              className="text-[11px] font-[700] px-2.5 py-1 rounded-full transition-all"
              style={{
                background: i === 1 ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                color: i === 1 ? "#a78bfa" : "rgba(255,255,255,0.3)",
                border: `1px solid ${i === 1 ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 600 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: 600 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.4)", paddingTop: 16 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="#7c3aed"
              strokeWidth={2.5}
              fill="url(#gradVisitors)"
              dot={false}
              activeDot={{ r: 5, fill: "#7c3aed", stroke: "#0f0f14", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="pageviews"
              name="Pageviews"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fill="url(#gradPageviews)"
              dot={false}
              activeDot={{ r: 5, fill: "#0ea5e9", stroke: "#0f0f14", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

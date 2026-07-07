"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Apple", value: 35, color: "#a78bfa" },
  { name: "Samsung", value: 30, color: "#0ea5e9" },
  { name: "Xiaomi", value: 15, color: "#f59e0b" },
  { name: "Google", value: 10, color: "#10b981" },
  { name: "Others", value: 10, color: "#6366f1" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        className="rounded-[12px] px-3 py-2 text-[12px]"
        style={{
          background: "#18181f",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <span className="font-[700] text-white">{d.name}</span>
        <span className="ml-2" style={{ color: d.color }}>
          {d.value}%
        </span>
      </div>
    );
  }
  return null;
};

export function MarketShareChart() {
  return (
    <div
      className="rounded-[20px] p-6 h-full flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[16px] font-[800] text-white mb-1">Brand Market Share</h3>
        <p className="text-[12px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
          User search distribution
        </p>
      </div>

      {/* Donut Chart */}
      <div className="relative flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[26px] font-[900] text-white leading-none">{data.length}</span>
          <span
            className="text-[10px] font-[700] uppercase tracking-widest mt-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            brands
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span
              className="text-[12px] font-[600] flex-1"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {item.name}
            </span>
            <div
              className="flex-1 h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", maxWidth: 60 }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${item.value}%`, background: item.color }}
              />
            </div>
            <span
              className="text-[12px] font-[800] w-8 text-right"
              style={{ color: item.color }}
            >
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

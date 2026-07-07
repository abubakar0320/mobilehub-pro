"use client";

import { Server, Database, Activity, ShieldCheck, Wifi, Cpu } from "lucide-react";

const metrics = [
  { icon: ShieldCheck, label: "Access Level", value: "Superadmin", color: "#34d399", type: "badge" },
  { icon: Database, label: "Database", value: "Online", color: "#34d399", type: "status" },
  { icon: Server, label: "Server Load", value: "14%", color: "#a78bfa", type: "bar", pct: 14 },
  { icon: Activity, label: "API Latency", value: "42ms", color: "#34d399", type: "text" },
  { icon: Wifi, label: "CDN Status", value: "Healthy", color: "#34d399", type: "status" },
  { icon: Cpu, label: "Memory Usage", value: "38%", color: "#f59e0b", type: "bar", pct: 38 },
];

export function SystemHealth() {
  return (
    <div
      className="rounded-[20px] p-6 h-full flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(15,15,20,0.8) 50%, rgba(99,102,241,0.08) 100%)",
        border: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: "#7c3aed", opacity: 0.08, filter: "blur(50px)" }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center"
          style={{ background: "rgba(52,211,153,0.15)" }}
        >
          <ShieldCheck className="h-5 w-5" style={{ color: "#34d399" }} />
        </div>
        <div>
          <h3 className="text-[16px] font-[800] text-white leading-none">System Health</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#34d399" }}
            />
            <span className="text-[11px] font-[700]" style={{ color: "#34d399" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-4 flex-1">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-3">
            <m.icon className="h-4 w-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
            <span className="text-[13px] font-[500] flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              {m.label}
            </span>

            {m.type === "badge" && (
              <span
                className="text-[10px] font-[800] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: `${m.color}18`,
                  color: m.color,
                  border: `1px solid ${m.color}30`,
                }}
              >
                {m.value}
              </span>
            )}
            {m.type === "status" && (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                <span className="text-[12px] font-[700]" style={{ color: m.color }}>{m.value}</span>
              </div>
            )}
            {m.type === "text" && (
              <span className="text-[13px] font-[700]" style={{ color: m.color }}>{m.value}</span>
            )}
            {m.type === "bar" && (
              <div className="flex items-center gap-2">
                <div
                  className="w-16 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.pct}%`, background: m.color }}
                  />
                </div>
                <span className="text-[12px] font-[700] w-8" style={{ color: m.color }}>
                  {m.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-[11px] font-[600] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
          Last checked 2 min ago
        </span>
        <button
          className="text-[11px] font-[700] transition-colors"
          style={{ color: "#7c3aed" }}
        >
          Refresh ↻
        </button>
      </div>
    </div>
  );
}

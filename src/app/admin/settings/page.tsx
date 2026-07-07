import { SettingsForm } from "@/components/admin/SettingsForm";
import { Settings, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#0f0f14" }}
    >
      {/* ── Page Header ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div>
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-[800] uppercase tracking-widest"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            <Settings className="h-3 w-3" />
            Configuration
          </div>
          <h1
            className="text-[36px] font-[900] leading-tight tracking-tight mb-2"
            style={{ color: "white" }}
          >
            Platform Settings
          </h1>
          <p className="text-[14px] font-[500]" style={{ color: "rgba(255,255,255,0.35)" }}>
            Manage your account, security, and global platform preferences.
          </p>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-[700] self-start"
          style={{
            background: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.15)",
            color: "#34d399",
          }}
        >
          <Shield className="h-4 w-4" />
          Superadmin Access
        </div>
      </div>

      {/* ── Settings Form ────────────────────────────── */}
      <SettingsForm />
    </div>
  );
}

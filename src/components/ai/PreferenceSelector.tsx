"use client";

import { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface PreferenceOption {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}

interface PreferenceSelectorProps {
  title: string;
  stepNumber: number;
  options: PreferenceOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  columns?: 2 | 3 | 4;
}

export function PreferenceSelector({
  title,
  stepNumber,
  options,
  selectedId,
  onSelect,
  columns = 2,
}: PreferenceSelectorProps) {
  const colClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className="w-full">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-[800]"
          style={{
            background:
              selectedId
                ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
                : "var(--color-surface-2)",
            color: selectedId ? "#fff" : "var(--color-text-3)",
            transition: "background 0.3s ease",
          }}
        >
          {selectedId ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <span>{stepNumber}</span>
          )}
        </div>
        <h3
          className="text-[15px] font-[700]"
          style={{ color: "var(--color-text-1)" }}
        >
          {title}
        </h3>
      </div>

      {/* Options grid */}
      <div className={`grid ${colClass} gap-3`}>
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="relative flex flex-col items-start gap-2.5 p-4 rounded-[16px] text-left w-full transition-all duration-300 group/opt"
              style={{
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "2px solid var(--color-border)",
                background: isSelected
                  ? "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(99,102,241,0.06))"
                  : "var(--color-surface)",
                boxShadow: isSelected
                  ? "0 0 0 4px rgba(124,58,237,0.08), 0 4px 16px rgba(124,58,237,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.05)",
                transform: isSelected ? "translateY(-1px)" : "none",
              }}
            >
              {/* selection ring animation */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-[14px] pointer-events-none"
                  style={{
                    border: "2px solid rgba(124,58,237,0.3)",
                    animation: "optionPulse 1.5s ease-out forwards",
                  }}
                />
              )}

              {/* icon */}
              <div
                className="p-2.5 rounded-[12px] transition-all duration-300"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))"
                    : "var(--color-surface-2)",
                  color: isSelected ? "#fff" : "var(--color-text-3)",
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(124,58,237,0.35)"
                    : "none",
                }}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span
                className="text-[14px] font-[700] leading-tight"
                style={{
                  color: isSelected
                    ? "var(--color-primary)"
                    : "var(--color-text-2)",
                }}
              >
                {option.label}
              </span>

              {option.description && (
                <span
                  className="text-[12px] font-[500] leading-snug"
                  style={{ color: "var(--color-text-4)" }}
                >
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes optionPulse {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}

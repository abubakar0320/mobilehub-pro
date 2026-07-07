import { ReactNode } from "react";

export function FilterSection({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="py-[16px] border-b border-slate-100 dark:border-slate-800">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500 mb-[10px]">
        {title}
      </h3>
      <div>
        {children}
      </div>
    </div>
  );
}

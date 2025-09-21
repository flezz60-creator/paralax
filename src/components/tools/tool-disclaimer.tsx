import type { ReactNode } from "react";

interface ToolDisclaimerProps {
  children: ReactNode;
}

export function ToolDisclaimer({ children }: ToolDisclaimerProps) {
  return (
    <div className="rounded-2xl border border-amber-400/50 bg-amber-50/80 p-4 text-sm text-amber-900 dark:border-amber-400/60 dark:bg-amber-500/10 dark:text-amber-200">
      <p className="font-semibold">Hinweis</p>
      <div className="mt-2 space-y-1 leading-relaxed">{children}</div>
    </div>
  );
}

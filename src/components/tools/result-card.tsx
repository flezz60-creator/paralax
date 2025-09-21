import clsx from "clsx";
import type { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  children: ReactNode;
  tone?: "default" | "accent";
}

export function ResultCard({ title, children, tone = "default" }: ResultCardProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl border bg-card p-6 shadow-card",
        tone === "accent" ? "border-primary/30 bg-primary/5" : null
      )}
      aria-live="polite"
    >
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">{children}</div>
    </section>
  );
}

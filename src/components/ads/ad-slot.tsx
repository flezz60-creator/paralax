import clsx from "clsx";

export type AdPlacement =
  | "atf"
  | "in-content"
  | "sidebar"
  | "sticky-footer"
  | "sticky-sidebar";

const HEIGHTS: Record<AdPlacement, number> = {
  atf: 120,
  "in-content": 250,
  sidebar: 600,
  "sticky-footer": 80,
  "sticky-sidebar": 600,
};

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  label?: string;
}

export function AdSlot({ placement, className, label }: AdSlotProps) {
  const minHeight = HEIGHTS[placement] ?? 120;
  const baseLabel = label ?? `Ad-Slot: ${placement}`;

  return (
    <div
      aria-hidden
      role="presentation"
      className={clsx(
        "relative flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/60 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
        placement === "sticky-footer"
          ? "fixed inset-x-4 bottom-4 z-30 mx-auto max-w-md rounded-full px-6 shadow-card"
          : null,
        placement === "sticky-sidebar" ? "lg:sticky lg:top-28" : null,
        className
      )}
      style={{ minHeight }}
    >
      <span>{baseLabel}</span>
    </div>
  );
}

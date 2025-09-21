"use client";

import clsx from "clsx";

interface SegmentedControlOption {
  label: string;
  value: string;
  description?: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function SegmentedControl({ options, value, onChange, name }: SegmentedControlProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-muted/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
            aria-pressed={isActive}
            name={name}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

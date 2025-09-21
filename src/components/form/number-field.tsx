"use client";

import clsx from "clsx";
import type { ChangeEvent } from "react";
import { sanitizeNumberInput } from "@/lib/utils";

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  description?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  min,
  max,
  step,
  required,
  description,
  onBlur,
}: NumberFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(sanitizeNumberInput(event.target.value));
  };

  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <input
          id={id}
          name={id}
          value={value}
          onChange={handleChange}
          inputMode="decimal"
          lang="de"
          step={step}
          min={min}
          max={max}
          required={required}
          placeholder={placeholder}
          className={clsx(
            "w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition",
            "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          )}
          onBlur={onBlur}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
      {description ? <p className="text-xs text-muted-foreground/90">{description}</p> : null}
    </label>
  );
}

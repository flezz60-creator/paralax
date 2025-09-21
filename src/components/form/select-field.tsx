"use client";

import clsx from "clsx";
import type { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  description?: string;
}

export function SelectField({ id, label, value, onChange, options, description }: SelectFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <select
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        className={clsx(
          "w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition",
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description ? <p className="text-xs text-muted-foreground/90">{description}</p> : null}
    </label>
  );
}

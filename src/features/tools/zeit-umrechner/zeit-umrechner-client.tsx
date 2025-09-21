"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { TimeUnit, convertTime } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const TIME_UNITS: { value: TimeUnit; label: string; symbol: string }[] = [
  { value: "millisecond", label: "Millisekunde", symbol: "ms" },
  { value: "second", label: "Sekunde", symbol: "s" },
  { value: "minute", label: "Minute", symbol: "min" },
  { value: "hour", label: "Stunde", symbol: "h" },
  { value: "day", label: "Tag", symbol: "d" },
  { value: "week", label: "Woche", symbol: "Wo" },
  { value: "year", label: "Jahr", symbol: "a" },
];

export function ZeitUmrechnerClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "60" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "second" });

  const value = parseLocaleNumber(valueInput) ?? 0;
  const baseUnit = (unit as TimeUnit) || "second";

  const conversions = useMemo(
    () =>
      TIME_UNITS.map((target) => ({
        ...target,
        converted: convertTime(value, baseUnit, target.value),
      })),
    [value, baseUnit]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="zeit-wert"
          label="Ausgangswert"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "zeit-umrechner", field: "wert" })}
          description="Beispiel: 90 oder 2,5"
        />
        <SelectField
          id="zeit-einheit"
          label="Ausgangseinheit"
          value={baseUnit}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "zeit-umrechner", field: "einheit" });
          }}
          options={TIME_UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
        />
      </div>

      <ResultCard title="Umrechnungen" tone="accent">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {conversions.map((target) => (
            <li
              key={target.value}
              className={target.value === baseUnit ? "font-semibold text-foreground" : undefined}
            >
              {target.label}: {formatNumber(target.converted, { maximumFractionDigits: 6 })} {target.symbol}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground/80">
          Grundlage: 1 Tag = 24 Stunden, 1 Woche = 7 Tage, 1 Jahr = 365 Tage.
        </p>
      </ResultCard>
    </div>
  );
}

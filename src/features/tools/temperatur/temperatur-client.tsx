"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { TemperatureUnit, convertTemperature } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const UNITS: { value: TemperatureUnit; label: string; symbol: string }[] = [
  { value: "celsius", label: "Grad Celsius", symbol: "°C" },
  { value: "fahrenheit", label: "Grad Fahrenheit", symbol: "°F" },
  { value: "kelvin", label: "Kelvin", symbol: "K" },
];

export function TemperaturClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "0" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "celsius" });

  const value = parseLocaleNumber(valueInput) ?? 0;

  const conversions = useMemo(() => {
    return UNITS.map((target) => ({
      ...target,
      converted: convertTemperature(value, (unit as TemperatureUnit) || "celsius", target.value),
    }));
  }, [value, unit]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="temperatur"
          label="Temperatur"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "temperatur", field: "wert" })}
        />
        <SelectField
          id="einheit"
          label="Ausgangseinheit"
          value={unit || "celsius"}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "temperatur", field: "einheit" });
          }}
          options={UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
        />
      </div>

      <ResultCard title="Umrechnungen" tone="accent">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {conversions.map((target) => (
            <li key={target.value} className={target.value === unit ? "text-foreground font-semibold" : undefined}>
              {target.label}: {formatNumber(target.converted, { maximumFractionDigits: 2 })} {target.symbol}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">Formeln: °F = °C × 9/5 + 32, K = °C + 273,15.</p>
      </ResultCard>
    </div>
  );
}

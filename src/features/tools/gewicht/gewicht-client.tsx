"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { MassUnit, convertMass } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const MASS_UNITS: { value: MassUnit; label: string; symbol: string }[] = [
  { value: "kilogram", label: "Kilogramm", symbol: "kg" },
  { value: "gram", label: "Gramm", symbol: "g" },
  { value: "milligram", label: "Milligramm", symbol: "mg" },
  { value: "pound", label: "Pfund", symbol: "lb" },
  { value: "ounce", label: "Unze", symbol: "oz" },
  { value: "tonne", label: "Tonne", symbol: "t" },
];

export function GewichtClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "1" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "kilogram" });

  const value = parseLocaleNumber(valueInput) ?? 0;

  const conversions = useMemo(
    () =>
      MASS_UNITS.map((target) => ({
        ...target,
        converted: convertMass(value, (unit as MassUnit) || "kilogram", target.value),
      })),
    [value, unit]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="gewicht"
          label="Gewicht"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "gewicht", field: "wert" })}
        />
        <SelectField
          id="gewicht-einheit"
          label="Ausgangseinheit"
          value={unit || "kilogram"}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "gewicht", field: "einheit" });
          }}
          options={MASS_UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
        />
      </div>

      <ResultCard title="Umrechnungen" tone="accent">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {conversions.map((target) => (
            <li key={target.value} className={target.value === unit ? "text-foreground font-semibold" : undefined}>
              {target.label}: {formatNumber(target.converted, { maximumFractionDigits: 6 })} {target.symbol}
            </li>
          ))}
        </ul>
      </ResultCard>
    </div>
  );
}

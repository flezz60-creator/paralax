"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { LengthUnit, convertLength } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const LENGTH_UNITS: { value: LengthUnit; label: string; symbol: string }[] = [
  { value: "meter", label: "Meter", symbol: "m" },
  { value: "kilometer", label: "Kilometer", symbol: "km" },
  { value: "centimeter", label: "Zentimeter", symbol: "cm" },
  { value: "millimeter", label: "Millimeter", symbol: "mm" },
  { value: "inch", label: "Zoll", symbol: "in" },
  { value: "foot", label: "Fuß", symbol: "ft" },
  { value: "yard", label: "Yard", symbol: "yd" },
  { value: "mile", label: "Meile", symbol: "mi" },
];

export function LaengeClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "1" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "meter" });

  const value = parseLocaleNumber(valueInput) ?? 0;

  const conversions = useMemo(
    () =>
      LENGTH_UNITS.map((target) => ({
        ...target,
        converted: convertLength(value, (unit as LengthUnit) || "meter", target.value),
      })),
    [value, unit]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="laenge"
          label="Länge"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "laenge", field: "wert" })}
        />
        <SelectField
          id="laenge-einheit"
          label="Ausgangseinheit"
          value={unit || "meter"}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "laenge", field: "einheit" });
          }}
          options={LENGTH_UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
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

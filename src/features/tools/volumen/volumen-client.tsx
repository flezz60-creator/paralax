"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { VolumeUnit, convertVolume } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const VOLUME_UNITS: { value: VolumeUnit; label: string; symbol: string }[] = [
  { value: "liter", label: "Liter", symbol: "L" },
  { value: "milliliter", label: "Milliliter", symbol: "ml" },
  { value: "cubicMeter", label: "Kubikmeter", symbol: "m³" },
  { value: "cup", label: "Cup (metrisch)", symbol: "cup" },
  { value: "gallon", label: "US Gallone", symbol: "gal" },
  { value: "pint", label: "US Pint", symbol: "pt" },
  { value: "tablespoon", label: "Esslöffel", symbol: "EL" },
  { value: "teaspoon", label: "Teelöffel", symbol: "TL" },
];

export function VolumenClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "1" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "liter" });

  const value = parseLocaleNumber(valueInput) ?? 0;

  const conversions = useMemo(
    () =>
      VOLUME_UNITS.map((target) => ({
        ...target,
        converted: convertVolume(value, (unit as VolumeUnit) || "liter", target.value),
      })),
    [value, unit]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="volumen"
          label="Volumen"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "volumen", field: "wert" })}
        />
        <SelectField
          id="volumen-einheit"
          label="Ausgangseinheit"
          value={unit || "liter"}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "volumen", field: "einheit" });
          }}
          options={VOLUME_UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
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

"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { SpeedUnit, convertSpeed } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const SPEED_UNITS: { value: SpeedUnit; label: string; symbol: string }[] = [
  { value: "kilometersPerHour", label: "Kilometer pro Stunde", symbol: "km/h" },
  { value: "meterPerSecond", label: "Meter pro Sekunde", symbol: "m/s" },
  { value: "milesPerHour", label: "Meilen pro Stunde", symbol: "mph" },
  { value: "knot", label: "Knoten", symbol: "kn" },
];

export function GeschwindigkeitClient() {
  const [valueInput, setValueInput] = useQueryState("wert", { defaultValue: "100" });
  const [unit, setUnit] = useQueryState("einheit", { defaultValue: "kilometersPerHour" });

  const value = parseLocaleNumber(valueInput) ?? 0;
  const baseUnit = (unit as SpeedUnit) || "kilometersPerHour";

  const conversions = useMemo(
    () =>
      SPEED_UNITS.map((target) => ({
        ...target,
        converted: convertSpeed(value, baseUnit, target.value),
      })),
    [value, baseUnit]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="geschwindigkeit-wert"
          label="Ausgangswert"
          value={valueInput}
          onChange={setValueInput}
          onBlur={() => trackEvent("calc_change", { tool: "geschwindigkeit", field: "wert" })}
          description="Beispiel: 120 oder 27,8"
        />
        <SelectField
          id="geschwindigkeit-einheit"
          label="Ausgangseinheit"
          value={baseUnit}
          onChange={(next) => {
            setUnit(next);
            trackEvent("calc_change", { tool: "geschwindigkeit", field: "einheit" });
          }}
          options={SPEED_UNITS.map((entry) => ({ value: entry.value, label: `${entry.label} (${entry.symbol})` }))}
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
          Grundlage: 1 mph = 1,60934 km/h, 1 kn = 1,852 km/h.
        </p>
      </ResultCard>
    </div>
  );
}

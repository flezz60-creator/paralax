"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { bmi } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const BMI_RANGES = [
  { label: "Untergewicht", min: 0, max: 18.4 },
  { label: "Normalgewicht", min: 18.5, max: 24.9 },
  { label: "Übergewicht", min: 25, max: 29.9 },
  { label: "Adipositas Grad I", min: 30, max: 34.9 },
  { label: "Adipositas Grad II", min: 35, max: 39.9 },
  { label: "Adipositas Grad III", min: 40, max: 99 },
];

export function BMIClient() {
  const [weightInput, setWeightInput] = useQueryState("gewicht", { defaultValue: "80" });
  const [heightInput, setHeightInput] = useQueryState("groesse", { defaultValue: "180" });

  const weight = parseLocaleNumber(weightInput);
  const height = parseLocaleNumber(heightInput);

  const result = useMemo(() => bmi({ weightKg: weight ?? 0, heightCm: height ?? 0 }), [weight, height]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="gewicht"
          label="Gewicht"
          value={weightInput}
          onChange={setWeightInput}
          suffix="kg"
          onBlur={() => trackEvent("calc_change", { tool: "bmi", field: "gewicht" })}
        />
        <NumberField
          id="groesse"
          label="Körpergröße"
          value={heightInput}
          onChange={setHeightInput}
          suffix="cm"
          onBlur={() => trackEvent("calc_change", { tool: "bmi", field: "groesse" })}
        />
      </div>

      <ResultCard title="BMI-Ergebnis" tone="accent">
        <p className="text-base font-semibold text-foreground">BMI: {formatNumber(result.bmi, { maximumFractionDigits: 1 })}</p>
        <p className="text-sm text-muted-foreground">WHO-Kategorie: {result.category || "–"}</p>
        <p className="text-xs text-muted-foreground">Richtwerte gelten für Erwachsene ab 18 Jahren.</p>
      </ResultCard>

      <ResultCard title="WHO-Klassifikation">
        <div className="grid gap-2 text-sm text-muted-foreground">
          {BMI_RANGES.map((range) => (
            <div
              key={range.label}
              className={`rounded-2xl border px-4 py-3 ${range.label === result.category ? "border-primary bg-primary/10 text-primary" : "border-border"}`}
            >
              <p className="font-semibold text-foreground">{range.label}</p>
              <p>
                BMI {formatNumber(range.min, { maximumFractionDigits: 1 })} – {formatNumber(range.max, { maximumFractionDigits: 1 })}
              </p>
            </div>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}

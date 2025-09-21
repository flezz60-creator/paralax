"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SegmentedControl } from "@/components/form/segmented-control";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { PercentMode, percent } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const MODE_OPTIONS = [
  { label: "Prozentwert", value: "value" },
  { label: "Prozentsatz", value: "rate" },
  { label: "Grundwert", value: "base" },
] as const;

export function ProzentrechnerClient() {
  const [mode, setMode] = useQueryState("mode", { defaultValue: "value" });
  const [baseInput, setBaseInput] = useQueryState("g", { defaultValue: "" });
  const [rateInput, setRateInput] = useQueryState("p", { defaultValue: "" });
  const [valueInput, setValueInput] = useQueryState("w", { defaultValue: "" });

  const base = parseLocaleNumber(baseInput);
  const rate = parseLocaleNumber(rateInput);
  const value = parseLocaleNumber(valueInput);

  const result = useMemo(() => {
    const currentMode = (mode || "value") as PercentMode;
    return percent({ base, rate, value, mode: currentMode });
  }, [base, rate, value, mode]);

  const resultLabel = useMemo(() => {
    switch ((mode || "value") as PercentMode) {
      case "value":
        return `Prozentwert: ${formatNumber(result)} (gleicher Einheit wie Grundwert)`;
      case "rate":
        return `Prozentsatz: ${formatNumber(result, { maximumFractionDigits: 2 })} %`;
      case "base":
      default:
        return `Grundwert: ${formatNumber(result)}`;
    }
  }, [mode, result]);

  const afterValue = useMemo(() => {
    if ((mode || "value") !== "value" || base == null || !Number.isFinite(result)) {
      return null;
    }
    const finalPrice = (base ?? 0) - result;
    return `Ergebnis in Zahlen: ${formatNumber(base ?? 0)} − ${formatNumber(result)} = ${formatNumber(finalPrice)}.`;
  }, [base, mode, result]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">Berechnungsart</p>
        <SegmentedControl
          options={MODE_OPTIONS.map((option) => ({ ...option }))}
          value={mode || "value"}
          onChange={(next) => {
            setMode(next);
            trackEvent("calc_change", { tool: "prozentrechner", field: "mode" });
          }}
          name="percent-mode"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="grundwert"
          label="Grundwert (G)"
          value={baseInput}
          onChange={(next) => setBaseInput(next)}
          suffix="Einheit"
          onBlur={() => trackEvent("calc_change", { tool: "prozentrechner", field: "grundwert" })}
        />
        <NumberField
          id="prozentsatz"
          label="Prozentsatz (p)"
          value={rateInput}
          onChange={(next) => setRateInput(next)}
          suffix="%"
          onBlur={() => trackEvent("calc_change", { tool: "prozentrechner", field: "prozentsatz" })}
        />
        <NumberField
          id="prozentwert"
          label="Prozentwert (P)"
          value={valueInput}
          onChange={(next) => setValueInput(next)}
          suffix="Einheit"
          onBlur={() => trackEvent("calc_change", { tool: "prozentrechner", field: "prozentwert" })}
        />
      </div>
      <ResultCard title="Ergebnis">
        <p className="text-base font-semibold text-foreground">{resultLabel}</p>
        {afterValue ? <p>{afterValue}</p> : null}
        <p className="text-xs text-muted-foreground">
          Formel: P = G · (p / 100), p = (P / G) · 100, G = P / (p / 100)
        </p>
      </ResultCard>
    </div>
  );
}

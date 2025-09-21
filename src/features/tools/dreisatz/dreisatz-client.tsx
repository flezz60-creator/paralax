"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SegmentedControl } from "@/components/form/segmented-control";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { RuleOfThreeMode, ruleOfThree } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const MODE_OPTIONS = [
  { label: "Direkt proportional", value: "direct" },
  { label: "Antiproportional", value: "inverse" },
] as const;

export function DreisatzClient() {
  const [mode, setMode] = useQueryState("modus", { defaultValue: "direct" });
  const [baseQuantityInput, setBaseQuantityInput] = useQueryState("a", { defaultValue: "" });
  const [baseResultInput, setBaseResultInput] = useQueryState("b", { defaultValue: "" });
  const [targetQuantityInput, setTargetQuantityInput] = useQueryState("c", { defaultValue: "" });

  const baseQuantity = parseLocaleNumber(baseQuantityInput);
  const baseResult = parseLocaleNumber(baseResultInput);
  const targetQuantity = parseLocaleNumber(targetQuantityInput);

  const calculationMode = (mode || "direct") as RuleOfThreeMode;

  const canCalculate =
    baseQuantity !== null &&
    baseResult !== null &&
    targetQuantity !== null &&
    (calculationMode === "direct" ? baseQuantity !== 0 : targetQuantity !== 0);

  const result = useMemo(() => {
    if (!canCalculate) {
      return 0;
    }

    return ruleOfThree({
      baseQuantity,
      baseResult,
      targetQuantity,
      mode: calculationMode,
    });
  }, [baseQuantity, baseResult, targetQuantity, calculationMode, canCalculate]);

  const steps = useMemo(() => {
    if (!canCalculate || baseQuantity === null || baseResult === null || targetQuantity === null) {
      return [] as string[];
    }

    if (calculationMode === "direct") {
      const ratio = baseResult / baseQuantity;
      return [
        `Verhältnis berechnen: ${formatNumber(baseResult)} ÷ ${formatNumber(baseQuantity)} = ${formatNumber(ratio, {
          maximumFractionDigits: 6,
        })}.`,
        `Auf Zielmenge übertragen: ${formatNumber(ratio, { maximumFractionDigits: 6 })} × ${formatNumber(
          targetQuantity
        )} = ${formatNumber(result, { maximumFractionDigits: 6 })}.`,
      ];
    }

    const product = baseQuantity * baseResult;
    return [
      `Produkt bilden: ${formatNumber(baseQuantity)} × ${formatNumber(baseResult)} = ${formatNumber(product, {
        maximumFractionDigits: 6,
      })}.`,
      `Durch Zielwert teilen: ${formatNumber(product, { maximumFractionDigits: 6 })} ÷ ${formatNumber(
        targetQuantity
      )} = ${formatNumber(result, { maximumFractionDigits: 6 })}.`,
    ];
  }, [canCalculate, baseQuantity, baseResult, targetQuantity, calculationMode, result]);

  const hintMessage = useMemo(() => {
    if (baseQuantityInput || baseResultInput || targetQuantityInput) {
      if (!canCalculate) {
        return "Bitte gib gültige Zahlen ein und vermeide null als Divisor.";
      }
      return null;
    }

    return "Trage drei Werte ein – der fehlende vierte wird automatisch berechnet.";
  }, [baseQuantityInput, baseResultInput, targetQuantityInput, canCalculate]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">Verhältnisart</p>
        <SegmentedControl
          options={MODE_OPTIONS.map((option) => ({ ...option }))}
          value={calculationMode}
          onChange={(next) => {
            setMode(next);
            trackEvent("calc_change", { tool: "dreisatz", field: "modus" });
          }}
          name="dreisatz-mode"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="dreisatz-a"
          label="Ausgangswert A"
          value={baseQuantityInput}
          onChange={setBaseQuantityInput}
          onBlur={() => trackEvent("calc_change", { tool: "dreisatz", field: "a" })}
          description="Beispiel: 4 Portionen, 12 Meter, 5 Stunden"
        />
        <NumberField
          id="dreisatz-b"
          label="Zielwert B"
          value={baseResultInput}
          onChange={setBaseResultInput}
          onBlur={() => trackEvent("calc_change", { tool: "dreisatz", field: "b" })}
          description="Beispiel: 600 Gramm, 240 Euro, 30 Kilometer"
        />
        <NumberField
          id="dreisatz-c"
          label="Gesuchter Vergleichswert A′"
          value={targetQuantityInput}
          onChange={setTargetQuantityInput}
          onBlur={() => trackEvent("calc_change", { tool: "dreisatz", field: "c" })}
          description="Beispiel: neue Personenanzahl oder alternative Strecke"
        />
      </div>

      <ResultCard title="Ergebnis" tone="accent">
        {canCalculate ? (
          <div className="space-y-3">
            <p className="text-base font-semibold text-foreground">
              Gesuchter Wert B′: {formatNumber(result, { maximumFractionDigits: 6 })}
            </p>
            <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/80">
              Formel (direkt): B′ = (B ÷ A) × A′. Formel (antiproportional): B′ = (A × B) ÷ A′.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{hintMessage}</p>
        )}
      </ResultCard>
    </div>
  );
}

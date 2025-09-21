"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { compound } from "@/lib/calc";
import { formatCurrency, formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const COMPOUND_OPTIONS = [
  { value: "1", label: "Jährlich" },
  { value: "2", label: "Halbjährlich" },
  { value: "4", label: "Vierteljährlich" },
  { value: "12", label: "Monatlich" },
];

export function ZinseszinsClient() {
  const [principalInput, setPrincipalInput] = useQueryState("k0", { defaultValue: "10000" });
  const [rateInput, setRateInput] = useQueryState("zins", { defaultValue: "5" });
  const [yearsInput, setYearsInput] = useQueryState("jahre", { defaultValue: "10" });
  const [compoundInput, setCompoundInput] = useQueryState("turns", { defaultValue: "12" });
  const [savingsInput, setSavingsInput] = useQueryState("sparrate", { defaultValue: "200" });

  const principal = parseLocaleNumber(principalInput) ?? 0;
  const rate = parseLocaleNumber(rateInput) ?? 0;
  const years = parseLocaleNumber(yearsInput) ?? 0;
  const savingsPerMonth = parseLocaleNumber(savingsInput) ?? 0;
  const compoundsPerYear = Number(compoundInput) || 1;

  const contributionPerPeriod = savingsPerMonth * (12 / compoundsPerYear);
  const result = useMemo(() => {
    return compound({
      principal,
      rate,
      years,
      compoundsPerYear,
      contribution: contributionPerPeriod,
    });
  }, [principal, rate, years, compoundsPerYear, contributionPerPeriod]);

  const periods = compoundsPerYear * years;
  const totalSavings = contributionPerPeriod * periods;
  const totalDeposits = principal + totalSavings;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="startkapital"
          label="Startkapital"
          value={principalInput}
          onChange={setPrincipalInput}
          suffix="€"
          onBlur={() => trackEvent("calc_change", { tool: "zinseszins", field: "startkapital" })}
        />
        <NumberField
          id="zinssatz"
          label="Effektiver Zinssatz p.a."
          value={rateInput}
          onChange={setRateInput}
          suffix="%"
          onBlur={() => trackEvent("calc_change", { tool: "zinseszins", field: "zinssatz" })}
        />
        <NumberField
          id="jahre"
          label="Laufzeit (Jahre)"
          value={yearsInput}
          onChange={setYearsInput}
          onBlur={() => trackEvent("calc_change", { tool: "zinseszins", field: "jahre" })}
        />
        <SelectField
          id="turns"
          label="Verzinsung"
          value={compoundInput || "12"}
          onChange={(next) => {
            setCompoundInput(next);
            trackEvent("calc_change", { tool: "zinseszins", field: "verzinsung" });
          }}
          options={COMPOUND_OPTIONS}
          description="Wie oft die Zinsen pro Jahr gutgeschrieben werden"
        />
        <NumberField
          id="sparrate"
          label="Sparrate pro Monat"
          value={savingsInput}
          onChange={setSavingsInput}
          suffix="€"
          onBlur={() => trackEvent("calc_change", { tool: "zinseszins", field: "sparrate" })}
        />
      </div>

      <ResultCard title="Endkapital" tone="accent">
        <p className="text-base font-semibold text-foreground">Nach {formatNumber(years, { maximumFractionDigits: 1 })} Jahren: {formatCurrency(result.futureValue, "EUR")}</p>
        <p className="text-sm text-muted-foreground">Einzahlungen gesamt: {formatCurrency(totalDeposits, "EUR")} · Zinsen: {formatCurrency(result.interestEarned, "EUR")}</p>
      </ResultCard>

      <ResultCard title="Verlauf">
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>Startkapital: {formatCurrency(principal, "EUR")}</li>
          <li>Regelmäßige Einzahlungen: {formatCurrency(totalSavings, "EUR")} ({formatNumber(periods)} Perioden)</li>
          <li className="font-semibold text-foreground">Gesamtes Endkapital: {formatCurrency(result.futureValue, "EUR")}</li>
        </ul>
        <p className="text-xs text-muted-foreground">Berechnung: K<sub>n</sub> = K<sub>0</sub> · (1 + i/m)<sup>m·n</sup> + R · (( (1 + i/m)<sup>m·n</sup> − 1) / (i/m))</p>
      </ResultCard>
    </div>
  );
}

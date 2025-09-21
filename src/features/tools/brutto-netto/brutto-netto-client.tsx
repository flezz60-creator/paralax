"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { formatCurrency, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const CLASS_RATES: Record<string, { incomeTax: number; social: number; solidarity: number }> = {
  I: { incomeTax: 0.19, social: 0.203, solidarity: 0.005 },
  II: { incomeTax: 0.17, social: 0.203, solidarity: 0.004 },
  III: { incomeTax: 0.09, social: 0.203, solidarity: 0.002 },
  IV: { incomeTax: 0.19, social: 0.203, solidarity: 0.005 },
  V: { incomeTax: 0.27, social: 0.203, solidarity: 0.005 },
  VI: { incomeTax: 0.32, social: 0.203, solidarity: 0.005 },
};

const STEUERKLASSEN = [
  { value: "I", label: "Steuerklasse I" },
  { value: "II", label: "Steuerklasse II" },
  { value: "III", label: "Steuerklasse III" },
  { value: "IV", label: "Steuerklasse IV" },
  { value: "V", label: "Steuerklasse V" },
  { value: "VI", label: "Steuerklasse VI" },
];

const KIRCHENSTEUER_OPTIONS = [
  { value: "nein", label: "Ohne Kirchensteuer" },
  { value: "ja", label: "Mit Kirchensteuer (9 % der Lohnsteuer)" },
];

export function BruttoNettoClient() {
  const [grossInput, setGrossInput] = useQueryState("brutto", { defaultValue: "3500" });
  const [taxClass, setTaxClass] = useQueryState("klasse", { defaultValue: "I" });
  const [church, setChurch] = useQueryState("kirche", { defaultValue: "nein" });

  const gross = parseLocaleNumber(grossInput) ?? 0;
  const rates = CLASS_RATES[taxClass || "I"] ?? CLASS_RATES.I;

  const breakdown = useMemo(() => {
    const incomeTax = gross * rates.incomeTax;
    const solidarity = gross * rates.solidarity;
    const social = gross * rates.social;
    const churchTax = church === "ja" ? incomeTax * 0.09 : 0;
    const total = incomeTax + solidarity + social + churchTax;
    const net = gross - total;
    return {
      incomeTax,
      solidarity,
      social,
      churchTax,
      total,
      net,
    };
  }, [gross, rates, church]);

  const yearlyGross = gross * 12;
  const yearlyNet = breakdown.net * 12;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="brutto"
          label="Bruttogehalt pro Monat"
          value={grossInput}
          onChange={(next) => setGrossInput(next)}
          suffix="€"
          onBlur={() => trackEvent("calc_change", { tool: "brutto-netto", field: "brutto" })}
        />
        <SelectField
          id="steuerklasse"
          label="Steuerklasse"
          value={taxClass || "I"}
          onChange={(next) => {
            setTaxClass(next);
            trackEvent("calc_change", { tool: "brutto-netto", field: "steuerklasse" });
          }}
          options={STEUERKLASSEN}
        />
        <SelectField
          id="kirchensteuer"
          label="Kirchensteuer"
          value={church || "nein"}
          onChange={(next) => {
            setChurch(next);
            trackEvent("calc_change", { tool: "brutto-netto", field: "kirchensteuer" });
          }}
          options={KIRCHENSTEUER_OPTIONS}
        />
      </div>

      <ResultCard title="Netto-Ergebnis" tone="accent">
        <p className="text-base font-semibold text-foreground">Netto (Monat): {formatCurrency(breakdown.net, "EUR")}</p>
        <p className="text-sm text-muted-foreground">Brutto {formatCurrency(gross, "EUR")} → Netto {formatCurrency(breakdown.net, "EUR")}</p>
        <p className="text-xs text-muted-foreground">Jahreswerte: {formatCurrency(yearlyGross, "EUR")} Brutto / {formatCurrency(yearlyNet, "EUR")} Netto</p>
      </ResultCard>

      <ResultCard title="Abzüge (Monat)">
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>Lohnsteuer: {formatCurrency(breakdown.incomeTax, "EUR")}</li>
          <li>Solidaritätszuschlag: {formatCurrency(breakdown.solidarity, "EUR")}</li>
          <li>Sozialabgaben (RV/KV/PV/AV): {formatCurrency(breakdown.social, "EUR")}</li>
          {church === "ja" ? <li>Kirchensteuer: {formatCurrency(breakdown.churchTax, "EUR")}</li> : null}
          <li className="font-semibold text-foreground">Gesamtabzüge: {formatCurrency(breakdown.total, "EUR")}</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Hinweis: Vereinfachtes Modell ohne Anspruch auf Vollständigkeit. Zuschläge, Freibeträge, Krankenversicherungszusatzbeiträge und Einmalzahlungen werden nicht berücksichtigt.
        </p>
      </ResultCard>
    </div>
  );
}

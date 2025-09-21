"use client";

import { useEffect, useMemo, useState } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { formatCurrency, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const CURRENCIES = ["EUR", "USD", "CHF", "GBP", "JPY", "CZK", "PLN"] as const;

interface FxResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export function WaehrungsrechnerClient() {
  const [amountInput, setAmountInput] = useQueryState("betrag", { defaultValue: "100" });
  const [fromCurrency, setFromCurrency] = useQueryState("von", { defaultValue: "EUR" });
  const [toCurrency, setToCurrency] = useQueryState("nach", { defaultValue: "USD" });

  const amount = parseLocaleNumber(amountInput) ?? 0;
  const [fxData, setFxData] = useState<FxResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    let isActive = true;
    async function fetchRates() {
      setStatus("loading");
      try {
        const symbols = CURRENCIES.filter((currency) => currency !== fromCurrency).join(",");
        const response = await fetch(`/api/fx?base=${fromCurrency}&symbols=${symbols}`);
        if (!response.ok) throw new Error("request failed");
        const json = (await response.json()) as FxResponse;
        if (isActive) {
          setFxData(json);
          setStatus("idle");
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setStatus("error");
        }
      }
    }

    fetchRates();
    return () => {
      isActive = false;
    };
  }, [fromCurrency]);

  const rate = useMemo(() => {
    if (!fxData) return 0;
    if (fromCurrency === toCurrency) return 1;
    const direct = fxData.rates[toCurrency];
    if (direct) return direct;
    // Fallback: convert via EUR
    const baseToFrom = fxData.rates[fromCurrency];
    const baseToTarget = fxData.rates[toCurrency];
    if (baseToFrom && baseToTarget) {
      return baseToTarget / baseToFrom;
    }
    return 0;
  }, [fxData, fromCurrency, toCurrency]);

  const converted = amount * rate;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          id="betrag"
          label="Betrag"
          value={amountInput}
          onChange={setAmountInput}
          onBlur={() => trackEvent("calc_change", { tool: "waehrungsrechner", field: "betrag" })}
        />
        <SelectField
          id="von"
          label="Von"
          value={fromCurrency || "EUR"}
          onChange={(next) => {
            setFromCurrency(next);
            trackEvent("calc_change", { tool: "waehrungsrechner", field: "von" });
          }}
          options={CURRENCIES.map((currency) => ({ value: currency, label: currency }))}
        />
        <SelectField
          id="nach"
          label="Nach"
          value={toCurrency || "USD"}
          onChange={(next) => {
            setToCurrency(next);
            trackEvent("calc_change", { tool: "waehrungsrechner", field: "nach" });
          }}
          options={CURRENCIES.map((currency) => ({ value: currency, label: currency }))}
        />
      </div>

      <ResultCard title="Umrechnung" tone="accent">
        {status === "error" ? (
          <p className="text-sm text-destructive">Wechselkurs konnte nicht geladen werden. Bitte versuche es später erneut.</p>
        ) : (
          <>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(amount, fromCurrency || "EUR")} → {formatCurrency(converted, toCurrency || "USD")}
            </p>
            <p className="text-sm text-muted-foreground">1 {fromCurrency} = {rate ? rate.toFixed(4) : "–"} {toCurrency}</p>
            <p className="text-xs text-muted-foreground">
              Quelle: Europäische Zentralbank · Stand {fxData ? new Intl.DateTimeFormat("de-DE").format(new Date(fxData.date)) : "–"}
            </p>
          </>
        )}
      </ResultCard>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { formatCurrency, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const CURRENCIES = ["EUR", "USD", "CHF", "GBP", "JPY", "CZK", "PLN"] as const;

const FX_CACHE_KEY = "tech-teddy.fx-cache.v1";
const FRESH_TTL = 1000 * 60 * 60 * 24; // 24 Stunden
const STALE_TTL = 1000 * 60 * 60 * 48; // 48 Stunden

interface FxResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

type FxCacheStore = Record<string, { timestamp: number; data: FxResponse }>;

function loadCachedRates(base: string): { data: FxResponse; isFresh: boolean; isStale: boolean } | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(FX_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const store = JSON.parse(raw) as FxCacheStore;
    const entry = store[base];
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const age = now - entry.timestamp;

    if (age > STALE_TTL) {
      return null;
    }

    return {
      data: entry.data,
      isFresh: age <= FRESH_TTL,
      isStale: age > FRESH_TTL,
    };
  } catch (error) {
    console.error("FX cache read failed", error);
    return null;
  }
}

function persistRates(base: string, data: FxResponse) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(FX_CACHE_KEY);
    const store: FxCacheStore = raw ? JSON.parse(raw) : {};

    store[base] = { data, timestamp: now };

    for (const [key, entry] of Object.entries(store)) {
      if (now - entry.timestamp > STALE_TTL) {
        delete store[key];
      }
    }

    window.localStorage.setItem(FX_CACHE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error("FX cache write failed", error);
  }
}

export function WaehrungsrechnerClient() {
  const [amountInput, setAmountInput] = useQueryState("betrag", { defaultValue: "100" });
  const [fromCurrency, setFromCurrency] = useQueryState("von", { defaultValue: "EUR" });
  const [toCurrency, setToCurrency] = useQueryState("nach", { defaultValue: "USD" });

  const amount = parseLocaleNumber(amountInput) ?? 0;
  const [fxData, setFxData] = useState<FxResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const base = (fromCurrency || "EUR").toUpperCase();
    const cached = loadCachedRates(base);

    setErrorMessage(null);

    if (cached) {
      setFxData(cached.data);
    } else {
      setFxData(null);
    }

    if (cached?.isFresh) {
      setIsLoading(false);
      return () => {
        isActive = false;
      };
    }

    async function fetchRates() {
      setIsLoading(true);
      try {
        const symbols = CURRENCIES.filter((currency) => currency !== base).join(",");
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`,
          {
            cache: "no-store",
            headers: { Accept: "application/json" },
          }
        );
        if (!response.ok) throw new Error(`Exchange API returned ${response.status}`);
        const json = (await response.json()) as FxResponse;
        if (isActive) {
          setFxData(json);
          setIsLoading(false);
          setErrorMessage(null);
          persistRates(base, json);
        }
      } catch (error) {
        console.error(error);
        if (!isActive) {
          return;
        }

        setIsLoading(false);

        if (cached && cached.isStale) {
          setErrorMessage("Live-Abruf nicht möglich – angezeigte Kurse können bis zu 48 Stunden alt sein.");
        } else {
          setFxData(null);
          setErrorMessage("Wechselkurs konnte nicht geladen werden. Bitte versuche es später erneut.");
        }
      }
    }

    fetchRates();
    return () => {
      isActive = false;
    };
  }, [fromCurrency]);

  const rate = useMemo(() => {
    if (fromCurrency === toCurrency) return 1;
    if (!fxData) return 0;
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

  const baseCurrency = fromCurrency || "EUR";
  const targetCurrency = toCurrency || "USD";
  const hasRate = rate > 0 && (fxData !== null || fromCurrency === toCurrency);
  const converted = hasRate ? amount * rate : null;

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
        {errorMessage ? (
          <p className="mb-3 text-sm text-destructive">{errorMessage}</p>
        ) : null}
        {hasRate ? (
          <>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(amount, baseCurrency)} →
              {" "}
              {converted !== null ? formatCurrency(converted, targetCurrency) : "–"}
            </p>
            <p className="text-sm text-muted-foreground">
              1 {baseCurrency} = {rate ? rate.toFixed(4) : "–"} {targetCurrency}
            </p>
            {fxData ? (
              <p className="text-xs text-muted-foreground">
                Quelle: Europäische Zentralbank · Stand
                {" "}
                {new Intl.DateTimeFormat("de-DE").format(new Date(fxData.date))}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">Direkte Umrechnung ohne Wechselkurs notwendig.</p>
            )}
            {isLoading && fxData ? (
              <p className="text-xs text-muted-foreground">Aktualisiere Kurse …</p>
            ) : null}
          </>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground">Wechselkurse werden geladen …</p>
        ) : (
          <p className="text-sm text-muted-foreground">Keine aktuellen Wechselkurse verfügbar.</p>
        )}
      </ResultCard>
    </div>
  );
}

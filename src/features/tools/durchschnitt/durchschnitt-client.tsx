"use client";

import { useMemo } from "react";
import { SelectField } from "@/components/form/select-field";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { arithmeticMean, median, populationStandardDeviation } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const PRECISION_OPTIONS = [
  { value: "0", label: "0 (ganze Zahlen)" },
  { value: "1", label: "1 Nachkommastelle" },
  { value: "2", label: "2 Nachkommastellen" },
  { value: "3", label: "3 Nachkommastellen" },
  { value: "4", label: "4 Nachkommastellen" },
  { value: "5", label: "5 Nachkommastellen" },
  { value: "6", label: "6 Nachkommastellen" },
];

function clampPrecision(value: string | null | undefined): number {
  const parsed = Number.parseInt(value ?? "2", 10);
  if (!Number.isFinite(parsed)) {
    return 2;
  }
  return Math.min(Math.max(parsed, 0), 6);
}

export function DurchschnittClient() {
  const [valuesInput, setValuesInput] = useQueryState("werte", { defaultValue: "3\n4\n5" });
  const [precisionInput, setPrecisionInput] = useQueryState("stellen", { defaultValue: "2" });

  const decimals = clampPrecision(precisionInput);
  const extendedPrecision = Math.min(decimals + 2, 8);

  const { values, ignored } = useMemo(() => {
    const normalized = (valuesInput ?? "").replace(/[;|]/g, " ").replace(/\r/g, " ");
    const tokens = normalized
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const parsedValues: number[] = [];
    let ignoredCount = 0;

    tokens.forEach((token) => {
      const parsed = parseLocaleNumber(token);
      if (parsed === null) {
        ignoredCount += 1;
        return;
      }
      parsedValues.push(parsed);
    });

    return { values: parsedValues, ignored: ignoredCount };
  }, [valuesInput]);

  const sortedValues = useMemo(() => [...values].sort((a, b) => a - b), [values]);
  const count = values.length;
  const sum = useMemo(() => values.reduce((acc, value) => acc + value, 0), [values]);
  const mean = useMemo(() => arithmeticMean(values, extendedPrecision), [values, extendedPrecision]);
  const medianValue = useMemo(() => median(values, extendedPrecision), [values, extendedPrecision]);
  const stdDeviation = useMemo(
    () => populationStandardDeviation(values, extendedPrecision),
    [values, extendedPrecision]
  );
  const minValue = count ? sortedValues[0] : 0;
  const maxValue = count ? sortedValues[count - 1] : 0;
  const range = count ? maxValue - minValue : 0;

  const formattedList = useMemo(
    () =>
      sortedValues.map((value, index) =>
        `${index + 1}. ${formatNumber(value, { maximumFractionDigits: decimals })}`
      ),
    [sortedValues, decimals]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <label className="block space-y-2" htmlFor="durchschnitt-werte">
          <span className="text-sm font-medium text-foreground">Werte</span>
          <textarea
            id="durchschnitt-werte"
            name="durchschnitt-werte"
            value={valuesInput}
            onChange={(event) => setValuesInput(event.target.value)}
            onBlur={() => trackEvent("calc_change", { tool: "durchschnitt", field: "werte" })}
            rows={6}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            placeholder="Beispiel: 2\n2,5\n3"
          />
          <p className="text-xs text-muted-foreground/90">
            Trenne Werte mit Leerzeichen, Zeilenumbrüchen oder Semikolons. Dezimalkomma wird automatisch erkannt.
          </p>
        </label>
        <SelectField
          id="durchschnitt-stellen"
          label="Rundung"
          value={precisionInput || "2"}
          onChange={(next) => {
            setPrecisionInput(next);
            trackEvent("calc_change", { tool: "durchschnitt", field: "stellen" });
          }}
          options={PRECISION_OPTIONS}
          description="Bestimmt die Anzahl der Nachkommastellen im Ergebnis."
        />
      </div>

      <ResultCard title="Auswertung" tone="accent">
        {count > 0 ? (
          <div className="space-y-3">
            <p className="text-base font-semibold text-foreground">
              Durchschnitt (arithmetisch): {formatNumber(mean, { maximumFractionDigits: decimals })}
            </p>
            <dl className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <dt className="font-medium text-foreground">Anzahl</dt>
                <dd>{count}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Summe</dt>
                <dd>{formatNumber(sum, { maximumFractionDigits: Math.max(decimals, 4) })}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Minimum</dt>
                <dd>{formatNumber(minValue, { maximumFractionDigits: decimals })}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Maximum</dt>
                <dd>{formatNumber(maxValue, { maximumFractionDigits: decimals })}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Median</dt>
                <dd>{formatNumber(medianValue, { maximumFractionDigits: decimals })}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Standardabweichung</dt>
                <dd>{formatNumber(stdDeviation, { maximumFractionDigits: decimals })}</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Spannweite</dt>
                <dd>{formatNumber(range, { maximumFractionDigits: decimals })}</dd>
              </div>
            </dl>
            <div>
              <p className="font-medium text-foreground">Sortierte Werte</p>
              <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                {formattedList.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
            {ignored > 0 ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Hinweis: {ignored} Eingaben konnten nicht interpretiert werden und wurden ignoriert.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Bitte gib mindestens einen gültigen Wert ein, um den Durchschnitt zu berechnen.
          </p>
        )}
      </ResultCard>
    </div>
  );
}

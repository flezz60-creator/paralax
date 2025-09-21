"use client";

import { useMemo } from "react";
import { NumberField } from "@/components/form/number-field";
import { SelectField } from "@/components/form/select-field";
import { SegmentedControl } from "@/components/form/segmented-control";
import { ResultCard } from "@/components/tools/result-card";
import { trackEvent } from "@/lib/analytics";
import { PAL_VALUES, mifflinStJeor, totalEnergyExpenditure } from "@/lib/calc";
import { formatNumber, parseLocaleNumber } from "@/lib/utils";
import { useQueryState } from "@/hooks/use-query-state";

const SEX_OPTIONS = [
  { label: "weiblich", value: "female" },
  { label: "männlich", value: "male" },
  { label: "divers", value: "diverse" },
] as const;

export function KalorienverbrauchClient() {
  const [sex, setSex] = useQueryState("sex", { defaultValue: "female" });
  const [ageInput, setAgeInput] = useQueryState("alter", { defaultValue: "30" });
  const [weightInput, setWeightInput] = useQueryState("gewicht", { defaultValue: "68" });
  const [heightInput, setHeightInput] = useQueryState("groesse", { defaultValue: "170" });
  const [palInput, setPalInput] = useQueryState("pal", { defaultValue: PAL_VALUES[1].value.toString() });

  const age = parseLocaleNumber(ageInput) ?? 0;
  const weight = parseLocaleNumber(weightInput) ?? 0;
  const height = parseLocaleNumber(heightInput) ?? 0;
  const pal = Number(palInput) || PAL_VALUES[1].value;

  const bmr = useMemo(() => mifflinStJeor({ weightKg: weight, heightCm: height, age, sex: (sex as typeof SEX_OPTIONS[number]["value"]) || "female" }), [age, height, weight, sex]);
  const tee = useMemo(() => totalEnergyExpenditure(bmr, pal), [bmr, pal]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-muted-foreground">Biometrische Angaben</p>
        <SegmentedControl
          options={SEX_OPTIONS.map((option) => ({ ...option }))}
          value={sex || "female"}
          onChange={(next) => {
            setSex(next);
            trackEvent("calc_change", { tool: "kalorienverbrauch", field: "sex" });
          }}
          name="sex"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          id="alter"
          label="Alter"
          value={ageInput}
          onChange={setAgeInput}
          suffix="Jahre"
          onBlur={() => trackEvent("calc_change", { tool: "kalorienverbrauch", field: "alter" })}
        />
        <NumberField
          id="gewicht"
          label="Gewicht"
          value={weightInput}
          onChange={setWeightInput}
          suffix="kg"
          onBlur={() => trackEvent("calc_change", { tool: "kalorienverbrauch", field: "gewicht" })}
        />
        <NumberField
          id="groesse"
          label="Größe"
          value={heightInput}
          onChange={setHeightInput}
          suffix="cm"
          onBlur={() => trackEvent("calc_change", { tool: "kalorienverbrauch", field: "groesse" })}
        />
      </div>

      <SelectField
        id="pal"
        label="Aktivitätsprofil (PAL)"
        value={palInput || PAL_VALUES[1].value.toString()}
        onChange={(next) => {
          setPalInput(next);
          trackEvent("calc_change", { tool: "kalorienverbrauch", field: "pal" });
        }}
        options={PAL_VALUES.map((entry) => ({ value: entry.value.toString(), label: `${entry.value.toFixed(1)} – ${entry.label}` }))}
      />

      <ResultCard title="Kalorienbedarf" tone="accent">
        <p className="text-base font-semibold text-foreground">Grundumsatz (BMR): {formatNumber(bmr, { maximumFractionDigits: 0 })} kcal</p>
        <p className="text-base font-semibold text-foreground">Gesamtumsatz: {formatNumber(tee, { maximumFractionDigits: 0 })} kcal</p>
        <p className="text-xs text-muted-foreground">Formel: Mifflin-St.-Jeor (Gewicht × 10 + Größe × 6,25 − Alter × 5 ± Geschlechtsfaktor).</p>
      </ResultCard>

      <ResultCard title="Einordnung">
        <p className="text-sm text-muted-foreground">
          Der Gesamtumsatz entspricht dem geschätzten Kalorienbedarf zur Gewichtserhaltung. Für ein moderates Kaloriendefizit ziehe 300–500 kcal ab, für Muskelaufbau addiere 250–300 kcal.
        </p>
      </ResultCard>
    </div>
  );
}

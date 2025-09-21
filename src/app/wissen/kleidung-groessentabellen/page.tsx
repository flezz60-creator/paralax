import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { knowledgeArticles } from "@/data/knowledge";

const article = knowledgeArticles.find((entry) => entry.slug === "kleidung-groessentabellen");

export const metadata: Metadata = {
  title: `${article?.title ?? "Kleidung-Größen"} – Tabellen & Umrechnung`,
  description: article?.description,
  alternates: {
    canonical: "https://tech-teddy.de/wissen/kleidung-groessentabellen",
  },
};

const WOMEN = [
  { eu: "32", de: "30", uk: "4", us: "0", bust: 78, waist: 60, hip: 86 },
  { eu: "36", de: "34", uk: "8", us: "4", bust: 84, waist: 66, hip: 92 },
  { eu: "40", de: "38", uk: "12", us: "8", bust: 92, waist: 74, hip: 100 },
  { eu: "44", de: "42", uk: "16", us: "12", bust: 100, waist: 82, hip: 108 },
];

const MEN = [
  { eu: "44", de: "44", uk: "34", us: "34", chest: 88, waist: 78 },
  { eu: "48", de: "48", uk: "38", us: "38", chest: 96, waist: 86 },
  { eu: "52", de: "52", uk: "42", us: "42", chest: 104, waist: 94 },
  { eu: "56", de: "56", uk: "46", us: "46", chest: 112, waist: 102 },
];

const KIDS = [
  { height: "98 cm", de: "98", age: "2–3 Jahre" },
  { height: "116 cm", de: "116", age: "5–6 Jahre" },
  { height: "134 cm", de: "134", age: "8–9 Jahre" },
  { height: "152 cm", de: "152", age: "11–12 Jahre" },
];

export default function KleidungGroessenPage() {
  return (
    <article className="space-y-10">
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Wissen", href: "/wissen" },
            { label: article?.title ?? "Kleidung-Größen" },
          ]}
        />
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{article?.title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">{article?.description}</p>
          <p className="text-xs text-muted-foreground">Stand: {article ? new Intl.DateTimeFormat("de-DE").format(new Date(article.updated)) : "2025"}</p>
        </header>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Damen-Größen (Oberteile)</h2>
        <p className="text-sm text-muted-foreground">Maße in Zentimetern, gemessen an der stärksten Stelle von Brust, Taille und Hüfte.</p>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">EU</th>
                <th className="px-4 py-3">DE</th>
                <th className="px-4 py-3">UK</th>
                <th className="px-4 py-3">US</th>
                <th className="px-4 py-3">Brust</th>
                <th className="px-4 py-3">Taille</th>
                <th className="px-4 py-3">Hüfte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {WOMEN.map((row) => (
                <tr key={`${row.eu}-${row.uk}`} className="odd:bg-card even:bg-muted/20">
                  <td className="px-4 py-3 font-semibold text-foreground">{row.eu}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.de}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.uk}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.us}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.bust} cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.waist} cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.hip} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Herren-Größen (Sakkos)</h2>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">EU</th>
                <th className="px-4 py-3">DE</th>
                <th className="px-4 py-3">UK</th>
                <th className="px-4 py-3">US</th>
                <th className="px-4 py-3">Brustumfang</th>
                <th className="px-4 py-3">Taillenumfang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {MEN.map((row) => (
                <tr key={row.eu} className="odd:bg-card even:bg-muted/20">
                  <td className="px-4 py-3 font-semibold text-foreground">{row.eu}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.de}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.uk}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.us}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.chest} cm</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.waist} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Kindergrößen</h2>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Körpergröße</th>
                <th className="px-4 py-3">DE-Größe</th>
                <th className="px-4 py-3">Alter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {KIDS.map((row) => (
                <tr key={row.de} className="odd:bg-card even:bg-muted/20">
                  <td className="px-4 py-3 font-semibold text-foreground">{row.height}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.de}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Tipp: Körpermaße morgens messen, eng anliegendes Maßband nutzen und für Oberteile 1–2 cm Bewegungsspielraum einplanen.
        </p>
      </section>
    </article>
  );
}

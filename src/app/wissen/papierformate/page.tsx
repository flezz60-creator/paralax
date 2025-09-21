import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { knowledgeArticles } from "@/data/knowledge";
import { formatNumber } from "@/lib/utils";

const article = knowledgeArticles.find((entry) => entry.slug === "papierformate");

export const metadata: Metadata = {
  title: `${article?.title ?? "Papierformate"} – Maße & Umrechnung`,
  description: article?.description,
  alternates: {
    canonical: "https://tech-teddy.de/wissen/papierformate",
  },
};

const DIN_SERIES = [
  { name: "A0", width: 841, height: 1189 },
  { name: "A1", width: 594, height: 841 },
  { name: "A2", width: 420, height: 594 },
  { name: "A3", width: 297, height: 420 },
  { name: "A4", width: 210, height: 297 },
  { name: "A5", width: 148, height: 210 },
  { name: "A6", width: 105, height: 148 },
  { name: "A7", width: 74, height: 105 },
  { name: "A8", width: 52, height: 74 },
  { name: "A9", width: 37, height: 52 },
  { name: "A10", width: 26, height: 37 },
];

const MM_TO_INCH = 0.0393701;

function mmToInch(value: number) {
  return formatNumber(value * MM_TO_INCH, { maximumFractionDigits: 2 });
}

export default function PapierformatePage() {
  return (
    <article className="space-y-10">
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Wissen", href: "/wissen" },
            { label: article?.title ?? "Papierformate" },
          ]}
        />
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{article?.title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">{article?.description}</p>
          <p className="text-xs text-muted-foreground">Stand: {article ? new Intl.DateTimeFormat("de-DE").format(new Date(article.updated)) : "2025"}</p>
        </header>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">DIN A Reihe in mm & Zoll</h2>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Breite (mm)</th>
                <th className="px-4 py-3">Höhe (mm)</th>
                <th className="px-4 py-3">Breite (inch)</th>
                <th className="px-4 py-3">Höhe (inch)</th>
                <th className="px-4 py-3">Fläche (m²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DIN_SERIES.map((sheet) => {
                const area = (sheet.width / 1000) * (sheet.height / 1000);
                return (
                  <tr key={sheet.name} className="odd:bg-card even:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground">{sheet.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sheet.width}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sheet.height}</td>
                    <td className="px-4 py-3 text-muted-foreground">{mmToInch(sheet.width)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{mmToInch(sheet.height)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatNumber(area, { maximumFractionDigits: 4 })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Tipps für die Praxis</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>📎 Beim Drucken immer den Zuschnitt beachten: Randlos benötigt Beschnittzugaben von 3–5 mm.</li>
          <li>🖨️ Kopierer unterstützen meist A3 bis A5 – A0/A1 bekommst du im Copyshop.</li>
          <li>📝 Faltmethode: Ein DIN-A-Format halbiert ergibt das nächstkleinere Format (A4 → A5).</li>
          <li>
            📐 Kombination mit unserem{" "}
            <Link className="text-primary underline-offset-4 hover:underline" href="/tools/laenge">
              Länge-Umrechner
            </Link>{" "}
            hilft bei Zoll-Bestellungen.
          </li>
        </ul>
      </section>
    </article>
  );
}

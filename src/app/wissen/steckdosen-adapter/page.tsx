import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { knowledgeArticles } from "@/data/knowledge";

const article = knowledgeArticles.find((entry) => entry.slug === "steckdosen-adapter");

export const metadata: Metadata = {
  title: `${article?.title ?? "Steckdosen-Adapter"} – Übersicht`,
  description: article?.description,
  alternates: {
    canonical: "https://tech-teddy.de/wissen/steckdosen-adapter",
  },
};

const PLUG_TYPES = [
  { type: "C", name: "Eurostecker", voltage: "220–240 V", countries: "Großer Teil Europas" },
  { type: "F", name: "Schuko", voltage: "220–240 V", countries: "Deutschland, Österreich, Niederlande" },
  { type: "E", name: "Französisch", voltage: "220–240 V", countries: "Frankreich, Belgien, Polen" },
  { type: "G", name: "Britisch", voltage: "230 V", countries: "UK, Irland, Malta, Zypern" },
  { type: "I", name: "Australisch", voltage: "230 V", countries: "Australien, Neuseeland, China" },
  { type: "A/B", name: "Nordamerika", voltage: "100–127 V", countries: "USA, Kanada, Mexiko" },
  { type: "L", name: "Italien", voltage: "230 V", countries: "Italien, Chile, einige afrikanische Länder" },
];

export default function SteckdosenAdapterPage() {
  return (
    <article className="space-y-10">
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Wissen", href: "/wissen" },
            { label: article?.title ?? "Steckdosen-Adapter" },
          ]}
        />
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{article?.title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">{article?.description}</p>
          <p className="text-xs text-muted-foreground">Stand: {article ? new Intl.DateTimeFormat("de-DE").format(new Date(article.updated)) : "2025"}</p>
        </header>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Steckdosen-Typen und Spannung</h2>
        <p className="text-sm text-muted-foreground">
          Die folgende Tabelle zeigt die wichtigsten Steckdosen-Typen und Netzspannungen. Für Reisen solltest du prüfen, ob dein Gerät Mehrfachspannung (110–240 V) unterstützt. Andernfalls benötigst du zusätzlich zum Adapter einen Spannungswandler.
        </p>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Typ</th>
                <th className="px-4 py-3">Bezeichnung</th>
                <th className="px-4 py-3">Spannung</th>
                <th className="px-4 py-3">Länder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {PLUG_TYPES.map((plug) => (
                <tr key={plug.type} className="odd:bg-card even:bg-muted/20">
                  <td className="px-4 py-3 font-semibold text-foreground">{plug.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{plug.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{plug.voltage}</td>
                  <td className="px-4 py-3 text-muted-foreground">{plug.countries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Packliste für den Adapterkauf</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✔️ Universaladapter für weltweit unterschiedliche Steckdosen (Typ A–L).</li>
          <li>✔️ USB-A- und USB-C-Anschlüsse, um Smartphone oder Kamera direkt zu laden.</li>
          <li>✔️ Überspannungsschutz und CE-Kennzeichnung für mehr Sicherheit.</li>
          <li>✔️ Kompaktes Reiseetui, damit Kleinteile nicht verloren gehen.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Weitere Tipps</h2>
        <p className="text-sm text-muted-foreground">
          In vielen Ländern sind kombinierte Steckdosen vorhanden (z.&nbsp;B. Typ C/E in Frankreich). Prüfe trotzdem vor Reiseantritt, ob Hotels entsprechende Adapter anbieten. Für leistungsstarke Geräte wie Haartrockner gilt: nur verwenden, wenn Spannung und Frequenz übereinstimmen.
        </p>
      </section>
    </article>
  );
}

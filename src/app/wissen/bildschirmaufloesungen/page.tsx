import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { knowledgeArticles } from "@/data/knowledge";

const article = knowledgeArticles.find((entry) => entry.slug === "bildschirmaufloesungen");

export const metadata: Metadata = {
  title: `${article?.title ?? "Bildschirmauflösungen"} – Tabelle & Pixel-Dichte`,
  description: article?.description,
  alternates: {
    canonical: "https://tech-teddy.de/wissen/bildschirmaufloesungen",
  },
};

const RESOLUTIONS = [
  { name: "HD", pixels: "1280 × 720", aspect: "16:9", alias: "720p" },
  { name: "Full HD", pixels: "1920 × 1080", aspect: "16:9", alias: "1080p" },
  { name: "WQHD", pixels: "2560 × 1440", aspect: "16:9", alias: "1440p" },
  { name: "Ultra HD / 4K", pixels: "3840 × 2160", aspect: "16:9", alias: "2160p" },
  { name: "5K", pixels: "5120 × 2880", aspect: "16:9", alias: "iMac 5K" },
  { name: "UWQHD", pixels: "3440 × 1440", aspect: "21:9", alias: "Ultra-Wide" },
  { name: "8K UHD", pixels: "7680 × 4320", aspect: "16:9", alias: "4320p" },
];

export default function BildschirmaufloesungenPage() {
  return (
    <article className="space-y-10">
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Wissen", href: "/wissen" },
            { label: article?.title ?? "Bildschirmauflösungen" },
          ]}
        />
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{article?.title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">{article?.description}</p>
          <p className="text-xs text-muted-foreground">Stand: {article ? new Intl.DateTimeFormat("de-DE").format(new Date(article.updated)) : "2025"}</p>
        </header>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Standardauflösungen im Überblick</h2>
        <div className="overflow-x-auto rounded-3xl border border-border/60">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Pixel</th>
                <th className="px-4 py-3">Seitenverhältnis</th>
                <th className="px-4 py-3">Alias</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RESOLUTIONS.map((resolution) => (
                <tr key={resolution.name} className="odd:bg-card even:bg-muted/20">
                  <td className="px-4 py-3 font-semibold text-foreground">{resolution.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{resolution.pixels}</td>
                  <td className="px-4 py-3 text-muted-foreground">{resolution.aspect}</td>
                  <td className="px-4 py-3 text-muted-foreground">{resolution.alias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Praxishinweise</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            🖥️ Für gestochen scharfe Darstellung spielt nicht nur die Auflösung, sondern auch die Displaygröße eine Rolle. Unser{" "}
            <Link className="text-primary underline-offset-4 hover:underline" href="/tools/dpi-rechner">
              DPI-Rechner
            </Link>{" "}
            hilft bei der Einschätzung.
          </li>
          <li>🎮 Gaming-Monitore nutzen häufig WQHD oder Ultra-Wide-Auflösungen – prüfe, ob deine Grafikkarte die Pixelzahl schafft.</li>
          <li>🎬 Streaming-Anbieter kennzeichnen Inhalte meist mit 720p, 1080p oder 4K. Höhere Auflösungen benötigen mehr Bandbreite.</li>
        </ul>
      </section>
    </article>
  );
}

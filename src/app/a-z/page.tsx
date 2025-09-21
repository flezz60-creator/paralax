import { Metadata } from "next";
import { ToolCard } from "@/components/tools/tool-card";
import { CLUSTERS, tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Tools A–Z",
  description: "Alle Rechner, Konverter, Generatoren und Info-Hubs von Tech Teddy in alphabetischer Übersicht.",
  alternates: {
    canonical: "https://tech-teddy.de/a-z",
  },
};

const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name, "de"));

export default function ToolsAZPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Tools von A–Z</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Hier findest du alle aktuellen und geplanten Tools. Live-Angebote sind verlinkt, geplante Varianten erkennst du am Hinweis „In Planung“.
        </p>
      </header>
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cluster im Überblick</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {Object.entries(CLUSTERS).map(([key, cluster]) => (
            <li key={key} className="rounded-3xl border border-border/70 bg-card p-4 text-sm text-muted-foreground">
              <p className="text-base font-semibold text-foreground">{cluster.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{cluster.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ToolSearch } from "@/components/search/tool-search";
import { ToolCard } from "@/components/tools/tool-card";
import { CLUSTERS, getLiveTools, getToolsByCluster } from "@/data/tools";

export default function Home() {
  const liveTools = getLiveTools();
  const clusterEntries = Object.entries(CLUSTERS) as [keyof typeof CLUSTERS, (typeof CLUSTERS)[keyof typeof CLUSTERS]][];

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Portal für smarte Rechner
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Tech Teddy macht Zahlen, Konverter und Generatoren einfach.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Ob Rabatt, Nettogehalt, BMI oder Maßeinheiten: Unsere Tools liefern in Sekunden Ergebnisse – optimiert für Mobilgeräte, barrierearm und shareable via URL.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
              <p className="text-3xl font-bold text-foreground">{liveTools.length}</p>
              <p>Tools im MVP</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
              <p className="text-3xl font-bold text-foreground">3</p>
              <p>Cluster für Mathe, Texte & Alltag</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card p-4 text-sm text-muted-foreground">
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p>Ohne Login, ohne Tracking nach Opt-out</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <Link href="/a-z" className="rounded-full border border-border px-4 py-2 font-medium text-foreground hover:border-primary/40 hover:text-primary">
              Alle Tools von A–Z
            </Link>
            <Link href="/wissen" className="rounded-full border border-border px-4 py-2 font-medium text-foreground hover:border-primary/40 hover:text-primary">
              Wissen & Guides entdecken
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-card">
          <ToolSearch tools={liveTools} />
          <p className="mt-4 text-xs text-muted-foreground">
            Tipp: Jeder Rechner speichert deine Eingaben in der URL – einfach Link kopieren und teilen.
          </p>
        </div>
      </section>

      {clusterEntries.map(([clusterId, cluster]) => {
        const tools = getToolsByCluster(clusterId);
        return (
          <section key={clusterId} className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{cluster.title}</h2>
                <p className="max-w-3xl text-sm text-muted-foreground">{cluster.description}</p>
              </div>
              <Link href="/a-z" className="text-sm font-semibold text-primary">
                Alle ansehen →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

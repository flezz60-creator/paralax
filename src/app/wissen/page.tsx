import type { Metadata } from "next";
import Link from "next/link";
import { knowledgeArticles } from "@/data/knowledge";

export const metadata: Metadata = {
  title: "Wissen & Guides",
  description: "Tech Teddy Wissen: Hintergrundartikel zu Steckdosen, Papierformaten, Bildschirmauflösungen und Größentabellen.",
  alternates: {
    canonical: "https://tech-teddy.de/wissen",
  },
};

const grouped = knowledgeArticles.reduce<Record<string, typeof knowledgeArticles>>(function (acc, article) {
  const key = article.category;
  if (!acc[key]) acc[key] = [];
  acc[key]!.push(article);
  return acc;
}, {});

export default function WissenPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Wissen & Guides</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Ergänzende Artikel mit Normen, Tabellen und Hintergrundwissen zu unseren Tools. Perfekt für Referenzen im Büro, Unterricht oder unterwegs.
        </p>
      </header>
      <div className="space-y-8">
        {Object.entries(grouped).map(([category, articles]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/wissen/${article.slug}`}
                  className="rounded-3xl border border-border/70 bg-card p-5 transition hover:border-primary/40 hover:shadow-card"
                >
                  <p className="text-base font-semibold text-foreground">{article.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{article.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">Stand: {new Intl.DateTimeFormat("de-DE").format(new Date(article.updated))}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

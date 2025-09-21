import Link from "next/link";
import type { ToolDefinition } from "@/data/tools";

export function RelatedTools({ related }: { related: ToolDefinition[] }) {
  if (!related.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Verwandte Tools</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block rounded-2xl border bg-card p-4 transition hover:border-primary/40 hover:shadow-card"
          >
            <p className="text-sm font-semibold text-foreground group-hover:text-primary">{tool.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{tool.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

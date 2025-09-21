import type { ToolDefinition } from "@/data/tools";

export function ExamplesSection({ examples }: { examples: ToolDefinition["examples"] }) {
  if (!examples.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Beispiele aus der Praxis</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {examples.map((example) => (
          <article key={example.title} className="rounded-2xl border bg-card p-4 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">{example.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{example.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

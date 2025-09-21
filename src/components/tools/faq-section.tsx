import type { ToolDefinition } from "@/data/tools";

export function FaqSection({ faqs }: { faqs: ToolDefinition["faqs"] }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border/80 bg-card/70 p-4 transition"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-foreground">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary transition group-open:rotate-90">
                ?
              </span>
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

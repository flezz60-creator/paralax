import Link from "next/link";
import type { ToolDefinition } from "@/data/tools";

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const isPlanned = tool.status === "planned";

  const content = (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-card">
      <div className="space-y-2">
        <p className="text-base font-semibold text-foreground">
          {tool.name}
          {isPlanned ? (
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              In Planung
            </span>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {tool.category}
      </p>
    </div>
  );

  if (isPlanned) {
    return <div className="opacity-90">{content}</div>;
  }

  return <Link href={`/tools/${tool.slug}`}>{content}</Link>;
}

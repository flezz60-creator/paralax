"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/data/tools";

interface ToolSearchProps {
  tools: ToolDefinition[];
}

export function ToolSearch({ tools }: ToolSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    return tools
      .filter((tool) => tool.status === "live")
      .filter((tool) => {
        const haystack = [tool.name, tool.shortDescription, ...tool.keywords].join(" ").toLowerCase();
        return haystack.includes(term);
      })
      .slice(0, 8);
  }, [query, tools]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground" htmlFor="tool-search">
        Schnellzugriff
      </label>
      <input
        id="tool-search"
        type="search"
        placeholder="Rechner oder Thema suchen..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-base shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
      />
      {query && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-border/60 bg-card p-4 shadow-lg">
          {results.length ? (
            <ul className="space-y-2">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                  >
                    <span className="block">{tool.name}</span>
                    <span className="block text-xs text-muted-foreground">{tool.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Keine Treffer gefunden.</p>
          )}
        </div>
      )}
    </div>
  );
}

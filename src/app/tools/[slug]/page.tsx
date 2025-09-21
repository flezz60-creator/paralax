import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ResultCard } from "@/components/tools/result-card";
import { ToolShell } from "@/components/tools/tool-shell";
import { getRelatedTools, getToolBySlug, getToolsByCluster, getLiveTools } from "@/data/tools";
import { TOOL_COMPONENTS } from "@/features/tools";

interface ToolPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getLiveTools().map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {};
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `https://tech-teddy.de/tools/${tool.slug}`,
    },
    keywords: tool.keywords,
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool!).filter((entry) => entry.status === "live");
  const Renderer = TOOL_COMPONENTS[tool!.slug];

  if (!Renderer) {
    return (
      <ToolShell
        tool={tool!}
        primary={
          <ResultCard title="In Vorbereitung" tone="accent">
            <p className="text-sm text-muted-foreground">
              Dieses Tool befindet sich in der Entwicklung. Du kannst uns über <a className="text-primary underline-offset-4 hover:underline" href="mailto:hallo@tech-teddy.de">hallo@tech-teddy.de</a> Feedback oder Feature-Wünsche senden.
            </p>
          </ResultCard>
        }
        related={related}
      >
        <ResultCard title="Ähnliche Tools">
          <p className="text-sm text-muted-foreground">Bis zum Release findest du hilfreiche Alternativen in diesem Cluster:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {getToolsByCluster(tool!.cluster)
              .filter((entry) => entry.status === "live")
              .map((entry) => (
                <li key={entry.slug}>
                  <a className="text-primary hover:underline" href={`/tools/${entry.slug}`}>
                    {entry.name}
                  </a>
                </li>
              ))}
          </ul>
        </ResultCard>
      </ToolShell>
    );
  }

  return (
    <Suspense
      fallback={
        <ToolShell
          tool={tool!}
          related={related}
          primary={
            <ResultCard title="Lade Tool" tone="accent">
              <p className="text-sm text-muted-foreground">Das Tool wird vorbereitet …</p>
            </ResultCard>
          }
        />
      }
    >
      <Renderer tool={tool!} related={related} />
    </Suspense>
  );
}

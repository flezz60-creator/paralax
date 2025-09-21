import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import type { ToolDefinition } from "@/data/tools";
import { AdSlot } from "../ads/ad-slot";
import { ExamplesSection } from "./examples-section";
import { FaqSection } from "./faq-section";
import { RelatedTools } from "./related-tools";
import { ToolDisclaimer } from "./tool-disclaimer";
import { ToolSchema } from "./tool-schema";

interface ToolShellProps {
  tool: ToolDefinition;
  primary: ReactNode;
  secondary?: ReactNode;
  related: ToolDefinition[];
  children?: ReactNode;
}

export function ToolShell({ tool, primary, secondary, related, children }: ToolShellProps) {
  return (
    <article className="space-y-12">
      <ToolSchema tool={tool} />
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Tools", href: "/a-z" },
            { label: tool.name },
          ]}
        />
        <header className="space-y-3">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
          <p className="max-w-2xl text-balance text-base text-muted-foreground">{tool.shortDescription}</p>
          {tool.ymyDisclaimer ? (
            <ToolDisclaimer>{tool.ymyDisclaimer}</ToolDisclaimer>
          ) : null}
          {tool.additionalDisclaimer ? (
            <ToolDisclaimer>{tool.additionalDisclaimer}</ToolDisclaimer>
          ) : null}
        </header>
      </div>

      <AdSlot placement="atf" className="mx-auto max-w-4xl" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          {primary}
          {children}
        </div>
        <aside className="space-y-6">
          {secondary}
          <AdSlot placement="sticky-sidebar" className="hidden lg:block" />
        </aside>
      </div>

      <AdSlot placement="in-content" />

      <ExamplesSection examples={tool.examples} />
      <RelatedTools related={related} />
      <FaqSection faqs={tool.faqs} />
    </article>
  );
}

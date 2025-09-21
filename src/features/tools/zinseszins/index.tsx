import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { ZinseszinsClient } from "./zinseszins-client";

export function ZinseszinsTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<ZinseszinsClient />} related={related} />;
}

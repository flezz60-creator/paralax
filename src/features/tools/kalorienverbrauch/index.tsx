import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { KalorienverbrauchClient } from "./kalorienverbrauch-client";

export function KalorienverbrauchTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<KalorienverbrauchClient />} related={related} />;
}

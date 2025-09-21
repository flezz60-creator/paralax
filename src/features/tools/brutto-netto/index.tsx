import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { BruttoNettoClient } from "./brutto-netto-client";

export function BruttoNettoTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<BruttoNettoClient />} related={related} />;
}

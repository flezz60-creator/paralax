import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { LaengeClient } from "./laenge-client";

export function LaengeTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<LaengeClient />} related={related} />;
}

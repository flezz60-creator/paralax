import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { WaehrungsrechnerClient } from "./waehrungsrechner-client";

export function WaehrungsrechnerTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<WaehrungsrechnerClient />} related={related} />;
}

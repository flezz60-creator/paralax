import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { GewichtClient } from "./gewicht-client";

export function GewichtTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<GewichtClient />} related={related} />;
}

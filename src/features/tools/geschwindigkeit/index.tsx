import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { GeschwindigkeitClient } from "./geschwindigkeit-client";

export function GeschwindigkeitTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<GeschwindigkeitClient />} related={related} />;
}

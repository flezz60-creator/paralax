import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { DreisatzClient } from "./dreisatz-client";

export function DreisatzTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<DreisatzClient />} related={related} />;
}

import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { DurchschnittClient } from "./durchschnitt-client";

export function DurchschnittTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<DurchschnittClient />} related={related} />;
}

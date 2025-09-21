import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { ProzentrechnerClient } from "./prozentrechner-client";

export function ProzentrechnerTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<ProzentrechnerClient />} related={related} />;
}

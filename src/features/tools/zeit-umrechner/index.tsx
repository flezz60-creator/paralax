import { ToolShell } from "@/components/tools/tool-shell";
import type { ToolDefinition } from "@/data/tools";
import { ZeitUmrechnerClient } from "./zeit-umrechner-client";

export function ZeitUmrechnerTool({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) {
  return <ToolShell tool={tool} primary={<ZeitUmrechnerClient />} related={related} />;
}

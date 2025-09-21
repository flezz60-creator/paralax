import type { JSX } from "react";
import type { ToolDefinition } from "@/data/tools";
import { BMITool } from "./bmi";
import { BruttoNettoTool } from "./brutto-netto";
import { KalorienverbrauchTool } from "./kalorienverbrauch";
import { LaengeTool } from "./laenge";
import { ProzentrechnerTool } from "./prozentrechner";
import { TemperaturTool } from "./temperatur";
import { VolumenTool } from "./volumen";
import { WaehrungsrechnerTool } from "./waehrungsrechner";
import { ZinseszinsTool } from "./zinseszins";
import { GewichtTool } from "./gewicht";
import { DreisatzTool } from "./dreisatz";
import { DurchschnittTool } from "./durchschnitt";
import { ZeitUmrechnerTool } from "./zeit-umrechner";
import { GeschwindigkeitTool } from "./geschwindigkeit";

export type ToolRenderer = ({ tool, related }: { tool: ToolDefinition; related: ToolDefinition[] }) => JSX.Element;

export const TOOL_COMPONENTS: Record<string, ToolRenderer> = {
  prozentrechner: ProzentrechnerTool,
  "brutto-netto": BruttoNettoTool,
  zinseszins: ZinseszinsTool,
  bmi: BMITool,
  kalorienverbrauch: KalorienverbrauchTool,
  waehrungsrechner: WaehrungsrechnerTool,
  temperatur: TemperaturTool,
  laenge: LaengeTool,
  gewicht: GewichtTool,
  volumen: VolumenTool,
  dreisatz: DreisatzTool,
  durchschnitt: DurchschnittTool,
  "zeit-umrechner": ZeitUmrechnerTool,
  geschwindigkeit: GeschwindigkeitTool,
};

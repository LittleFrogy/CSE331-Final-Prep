import type { ComponentType } from "react";
import type { TopicSlug } from "@/lib/content";
import { CfgNotes } from "./cfg";
import { DecidabilityNotes } from "./decidability";
import { HaltNotes } from "./halt";
import { PdaNotes } from "./pda";
import { PumpingNotes } from "./pumping";
import { ReducibilityNotes } from "./reducibility";
import { TmNotes } from "./tm";

export const NOTES: Record<TopicSlug, ComponentType> = {
  pumping: PumpingNotes,
  cfg: CfgNotes,
  pda: PdaNotes,
  tm: TmNotes,
  halt: HaltNotes,
  decidability: DecidabilityNotes,
  reducibility: ReducibilityNotes,
};

export {
  CfgNotes,
  DecidabilityNotes,
  HaltNotes,
  PdaNotes,
  PumpingNotes,
  ReducibilityNotes,
  TmNotes,
};

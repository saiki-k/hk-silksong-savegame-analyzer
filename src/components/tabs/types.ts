import type { Dispatch, ReactNode, SetStateAction } from "react";

export type TabId =
  | "Stats"
  | "Masks & Spools"
  | "Abilities"
  | "Upgrades"
  | "Tools"
  | "Crests"
  | "Lost Fleas"
  | "Relics"
  | "Memory Lockets"
  | "Craftmetals"
  | "Mossberries"
  | "Keys"
  | "Maps"
  | "Bellways"
  | "Ventrica Stations"
  | "Mementos"
  | "Quests"
  | "Bosses"
  | "Hunter's Journal"
  | "Save Editor";

export interface TabRenderProps {
  parsedJson: unknown;
  decrypted: boolean;
  jsonText: string;
  setJsonText: Dispatch<SetStateAction<string>>;
  saveEncrypted: () => void;
  savePlain: () => void;
}

export interface TabDefinition {
  id: TabId;
  tabLabel: string;
  render: (props: TabRenderProps) => ReactNode;
  getProgress?: (props: { parsedJson: unknown; decrypted: boolean }) => ReactNode;
}

export interface ProgressData {
  type: 'count' | 'percentage';
  current: number;
  total: number;
}

export interface HuntersJournalProgressData {
  completed: number;
  encountered: number;
  total: number;
}

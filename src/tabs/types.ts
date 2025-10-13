import type { Dispatch, ReactNode, SetStateAction } from "react";

export type TabId =
  | "Stats"
  | "Masks & Spools"
  | "Abilities"
  | "Upgrades"
  | "Tools"
  | "Crests"
  | "Relics"
  | "Lost Fleas"
  | "Memory Lockets"
  | "Craftmetals"
  | "Keys"
  | "Quests"
  | "Bosses"
  | "Hunter's Journal"
  | "JSON Editor";

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
  getExtra?: (props: { parsedJson: unknown; decrypted: boolean }) => ReactNode;
}

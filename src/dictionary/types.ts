import type { ReactNode } from "react";

export type FlagParsingInfo = { type: "flag"; internalId: string };
export type FlagMultiParsingInfo = { type: "flagMulti"; internalId: string[] };
export type FlagMinParsingInfo = { type: "flagMin"; internalId: [string, number] }; // [flag name, required min. value]
export type FlagReturnParsingInfo = { type: "flagReturn"; internalId: string };
export type ToolParsingInfo = { type: "tool"; internalId: string[] };
export type JournalParsingInfo = { type: "journal"; internalId: [string, number] }; // [creature name, no. of required kills]
export type CrestParsingInfo = { type: "crest"; internalId: string };
export type CollectableParsingInfo = { type: "collectable"; internalId: string };
export type RelicParsingInfo = { type: "relic"; internalId: string };
export type QuestParsingInfo = { type: "quest"; internalId: string };
export type SceneDataParsingInfo = { type: "sceneData"; internalId: [string, string, boolean?] }; // [scene name, flag name, inverse?]
export type SceneVistedParsingInfo = { type: "sceneVisited"; internalId: string };
export type MementoDepositParsingInfo = { type: "mementoDeposit"; internalId: string };
export type ParsingInfo =
  | FlagParsingInfo
  | FlagMultiParsingInfo
  | FlagMinParsingInfo
  | FlagReturnParsingInfo
  | ToolParsingInfo
  | JournalParsingInfo
  | CrestParsingInfo
  | CollectableParsingInfo
  | RelicParsingInfo
  | QuestParsingInfo
  | SceneDataParsingInfo
  | SceneVistedParsingInfo
  | MementoDepositParsingInfo;
export type ParsingInfoMulti = ParsingInfo[];

export type CategoryItem = {
  name: string;
  section?: string;
  whichAct: 0 | 1 | 2 | 3;
  completionPercent?: number;
  prereqs?: string[];
  locationDetails: string;
  parsingInfo: ParsingInfo | ParsingInfoMulti;
  mapLink: string;
  killsRequired?: number;
  onlyFoundInClassicMode?: boolean;
  onlyFoundInSteelSoulMode?: boolean;
};

export type CategorySection = {
  name?: string;
  description?: string;
  descriptionMarkup?: ReactNode | ((showSpoilers?: boolean) => ReactNode);
  items: CategoryItem[];
};

export type TrackableCategory = {
  name: string;
  description: string;
  sections: CategorySection[];
};

export type NormalizedItem = CategoryItem & {
  isClassicModeItem: boolean;
  isSteelSoulModeItem: boolean;
  // Dynamic properties added during the "computeDictMapWithSaveData" run
  unlocked?: boolean;
  killsAchieved?: number;
  value?: unknown;
};

export type NormalizedSection = {
  name: string;
  description?: string;
  descriptionMarkup?: ReactNode | ((showSpoilers?: boolean) => ReactNode);
  totalPercent: number;
  totalCount: number;
  act_0: Record<NormalizedItem["name"], NormalizedItem>;
  act_1: Record<NormalizedItem["name"], NormalizedItem>;
  act_2: Record<NormalizedItem["name"], NormalizedItem>;
  act_3: Record<NormalizedItem["name"], NormalizedItem>;
};

export type NormalizedCategory = {
  name: string;
  description: string;
  totalPercent: number;
  totalCount: number;
  sections: Record<NormalizedSection["name"], NormalizedSection>;
  // Dynamic properties added during the "computeDictMapWithSaveData" run
  completedPercent?: number;
  completedCount?: number;
  journalMeta?: {
    encountered: number;
    completed: number;
  };
};

export type NormalisedDictMap = Record<NormalizedCategory["name"], NormalizedCategory>;

export type ItemPath = string; // Format: "categoryName.sectionName.act_X.itemName"

export type DictMapWithSaveData = {
  totalCompletedPercent: number;
  allItems: NormalisedDictMap;
  missingItemPaths: ItemPath[];
  completedItemPaths: ItemPath[];
};

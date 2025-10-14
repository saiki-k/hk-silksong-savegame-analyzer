export type FlagParsingInfo = { type: 'flag'; internalId: string };
export type FlagMultiParsingInfo = { type: 'flagMulti'; internalId: string[] };
export type FlagIntParsingInfo = { type: 'flagInt'; internalId: [string, number] };
export type FlagReturnParsingInfo = { type: 'flagReturn'; internalId: string };
export type ToolParsingInfo = { type: 'tool'; internalId: string[] };
export type JournalParsingInfo = { type: 'journal'; internalId: [string, number] }; // [creature name, no. of required kills]
export type CrestParsingInfo = { type: 'crest'; internalId: string };
export type CollectableParsingInfo = { type: 'collectable'; internalId: string };
export type RelictParsingInfo = { type: 'relict'; internalId: string };
export type QuestParsingInfo = { type: 'quest'; internalId: string };
export type SceneDataParsingInfo = { type: 'sceneData'; internalId: [string, string, boolean?] };
export type SceneVistedParsingInfo = { type: 'sceneVisited'; internalId: string };
export type MementoDepositParsingInfo = { type: 'mementoDeposit'; internalId: string };
export type ParsingInfo = FlagParsingInfo | FlagMultiParsingInfo | FlagIntParsingInfo | FlagReturnParsingInfo | ToolParsingInfo | JournalParsingInfo | CrestParsingInfo | CollectableParsingInfo | RelictParsingInfo | QuestParsingInfo | SceneDataParsingInfo | SceneVistedParsingInfo | MementoDepositParsingInfo;
export type ParsingInfoMulti = ParsingInfo[];

export type CategoryItem = {
  name: string;
  section?: string;
  whichAct: 0 | 1 | 2 | 3;
  completionPercent: number;
  prereqs: string[];
  location: string;
  parsingInfo: ParsingInfo | ParsingInfoMulti;
  mapLink: string;
  killsRequired?: number;
};

export type CategorySection = {
  name: string | undefined;
  description: string | undefined;
  items: CategoryItem[];
};

export type TrackableCategory = {
  name: string;
  description: string;
  items: CategoryItem[];
};

export type NormalisedTrackableCategory = {
  name: string;
  description: string;
  sections: CategorySection[];
};
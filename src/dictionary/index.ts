import type { TrackableCategory } from "./types";
import { normalizeDictionary } from "./normalizer";

import { stats } from "./categories/stats";
import { maskShards } from "./categories/maskShards";
import { spoolFragments } from "./categories/spoolFragments";
import { abilities } from "./categories/abilities";
import { upgrades } from "./categories/upgrades";
import { tools } from "./categories/tools";
import { crests } from "./categories/crests";
import { fleas } from "./categories/fleas";
import { relics } from "./categories/relics";
import { memoryLockets } from "./categories/memoryLockets";
import { craftmetals } from "./categories/craftmetals";
import { mossberries } from "./categories/mossberries";
import { paleOils } from "./categories/paleOils";
import { keys } from "./categories/keys";
import { silkeaters } from "./categories/silkeaters";
import { devices } from "./categories/devices";
import { materium } from "./categories/materium";
import { mementos } from "./categories/mementos";
import { maps } from "./categories/maps";
import { bellways } from "./categories/bellways";
import { ventricaStations } from "./categories/ventricaStations";
import { quests } from "./categories/quests";
import { bosses } from "./categories/bosses";
import { huntersJournal } from "./categories/huntersJournal";

export const ALL_TRACKED_CATEGORIES = [
  stats,
  maskShards,
  spoolFragments,
  abilities,
  upgrades,
  tools,
  crests,
  fleas,
  relics,
  memoryLockets,
  craftmetals,
  mossberries,
  paleOils,
  keys,
  silkeaters,
  devices,
  materium,
  mementos,
  maps,
  bellways,
  ventricaStations,
  quests,
  bosses,
  huntersJournal,
] as TrackableCategory[];

export const NORMALISED_DICT_MAP = normalizeDictionary(ALL_TRACKED_CATEGORIES);

export type { DictMapWithSaveData, NormalizedItem, NormalizedCategory, NormalizedSection, ItemPath } from "./types";

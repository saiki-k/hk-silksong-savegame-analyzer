import type { TrackableCategory } from "./types";

import { stats } from "./categories/stats";
import { masksAndSpools } from "./categories/masksAndSpools";
import { abilities } from "./categories/abilities";
import { upgrades } from "./categories/upgrades";
import { tools } from "./categories/tools";
import { crests } from "./categories/crests";
import { fleas } from "./categories/fleas";
import { relics } from "./categories/relics";
import { memoryLockets } from "./categories/memoryLockets";
import { craftmetals } from "./categories/craftmetals";
import { mossberries } from "./categories/mossberries";
import { silkeaters } from "./categories/silkeaters";
import { keys } from "./categories/keys";
import { mementos } from "./categories/mementos";
import { maps } from "./categories/maps";
import { bellways } from "./categories/bellways";
import { ventricaStations } from "./categories/ventricaStations";
import { quests } from "./categories/quests";
import { bosses } from "./categories/bosses";
import { huntersJournal } from "./categories/huntersJournal";

export const CATEGORIES: TrackableCategory[] = [
  stats,
  masksAndSpools,
  abilities,
  upgrades,
  tools,
  crests,
  fleas,
  relics,
  memoryLockets,
  craftmetals,
  mossberries,
  silkeaters,
  keys,
  mementos,
  maps,
  bellways,
  ventricaStations,
  quests,
  bosses,
  huntersJournal,
];

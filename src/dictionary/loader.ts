import type { TrackableCategory } from "./types";

export type CategoryName = 
  | "Stats"
  | "Mask Shards"
  | "Spool Fragments"
  | "Abilities"
  | "Upgrades" 
  | "Tools"
  | "Crests"
  | "Lost Fleas"
  | "Relics"
  | "Keys"
  | "Memory Lockets"
  | "Craftmetals"
  | "Mossberries"
  | "Pale Oil"
  | "Silkeaters"
  | "Bellhome"
  | "Materium"
  | "Mementos"
  | "Maps"
  | "Bellways"
  | "Ventrica Stations"
  | "Quests"
  | "Unique Spawns"
  | "Bosses"
  | "Hunter's Journal";

export type CategoryLoader = () => Promise<TrackableCategory>;

export const categoryLoaders: Record<CategoryName, CategoryLoader> = {
  "Stats": () => import("./categories/stats").then(m => m.stats),
  "Mask Shards": () => import("./categories/maskShards").then(m => m.maskShards),
  "Spool Fragments": () => import("./categories/spoolFragments").then(m => m.spoolFragments),
  "Abilities": () => import("./categories/abilities").then(m => m.abilities),
  "Upgrades": () => import("./categories/upgrades").then(m => m.upgrades),
  "Tools": () => import("./categories/tools").then(m => m.tools),
  "Crests": () => import("./categories/crests").then(m => m.crests),
  "Lost Fleas": () => import("./categories/fleas").then(m => m.fleas),
  "Relics": () => import("./categories/relics").then(m => m.relics),
  "Keys": () => import("./categories/keys").then(m => m.keys),
  "Memory Lockets": () => import("./categories/memoryLockets").then(m => m.memoryLockets),
  "Craftmetals": () => import("./categories/craftmetals").then(m => m.craftmetals),
  "Mossberries": () => import("./categories/mossberries").then(m => m.mossberries),
  "Pale Oil": () => import("./categories/paleOil").then(m => m.paleOil),
  "Silkeaters": () => import("./categories/silkeaters").then(m => m.silkeaters),
  "Bellhome": () => import("./categories/bellhome").then(m => m.bellhome),
  "Materium": () => import("./categories/materium").then(m => m.materium),
  "Mementos": () => import("./categories/mementos").then(m => m.mementos),
  "Maps": () => import("./categories/maps").then(m => m.maps),
  "Bellways": () => import("./categories/bellways").then(m => m.bellways),
  "Ventrica Stations": () => import("./categories/ventricaStations").then(m => m.ventricaStations),
  "Quests": () => import("./categories/quests").then(m => m.quests),
  "Unique Spawns": () => import("./categories/uniqueSpawns").then(m => m.uniqueSpawns),
  "Bosses": () => import("./categories/bosses").then(m => m.bosses),
  "Hunter's Journal": () => import("./categories/huntersJournal").then(m => m.huntersJournal),
};

export const loadCategory = async (categoryName: CategoryName): Promise<TrackableCategory> => {
  const loader = categoryLoaders[categoryName];
  if (!loader) {
    throw new Error(`Unknown category: ${categoryName}`);
  }
  return await loader();
};

export const loadCategories = async (categoryNames: CategoryName[]): Promise<TrackableCategory[]> => {
  return await Promise.all(categoryNames.map(loadCategory));
};

export const loadAllCategories = async (): Promise<TrackableCategory[]> => {
  const categoryNames = Object.keys(categoryLoaders) as CategoryName[];
  return await loadCategories(categoryNames);
};
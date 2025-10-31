import type { TrackableCategory } from "./types";
import { normalizeDictionary } from "./normalizer";
import { loadAllCategories, type CategoryName } from "./loader";

let _cachedCategories: TrackableCategory[] | null = null;
let _cachedDictMap: ReturnType<typeof normalizeDictionary> | null = null;

export const getAllCategories = async (): Promise<TrackableCategory[]> => {
  if (!_cachedCategories) {
    _cachedCategories = await loadAllCategories();
  }
  return _cachedCategories;
};

export const getNormalizedDictMap = async () => {
  if (!_cachedDictMap) {
    const categories = await getAllCategories();
    _cachedDictMap = normalizeDictionary(categories);
  }
  return _cachedDictMap;
};

export const ALL_CATEGORY_NAMES: CategoryName[] = [
  "Stats",
  "Mask Shards", 
  "Spool Fragments",
  "Abilities",
  "Upgrades",
  "Tools",
  "Crests",
  "Lost Fleas",
  "Relics", 
  "Keys",
  "Memory Lockets",
  "Craftmetals",
  "Mossberries",
  "Pale Oil",
  "Silkeaters",
  "Bellhome",
  "Materium",
  "Mementos",
  "Maps",
  "Bellways",
  "Ventrica Stations",
  "Quests",
  "Unique Spawns",
  "Bosses",
  "Hunter's Journal",
];

export { loadCategory, loadCategories, type CategoryName } from "./loader";
export type { DictMapWithSaveData, NormalizedItem, NormalizedCategory, NormalizedSection, ItemPath } from "./types";

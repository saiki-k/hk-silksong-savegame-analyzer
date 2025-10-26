import { isItemUnlockedInPlayerSave, isItemInCurrentGameMode } from "@/dictionary/parsers";
import type {
  NormalisedDictMap,
  NormalizedCategory,
  NormalizedSection,
  DictMapWithSaveData,
  ItemPath,
} from "@/dictionary/types";

export function computeDictMapWithSaveData(
  normalisedDict: NormalisedDictMap,
  parsedJson: unknown,
  inShowEverythingMode: boolean
): DictMapWithSaveData {
  if (inShowEverythingMode) {
    return {
      totalCompletedPercent: 0,
      allItems: normalisedDict,
      missingItemPaths: [] as ItemPath[],
      completedItemPaths: [] as ItemPath[],
    };
  }

  // Filter by given save file's current game mode first, then track missing/completed items
  let totalCompletedPercent = 0;
  const allItemsFilteredByGameMode: NormalisedDictMap = {};
  const missingItemPaths: ItemPath[] = [];
  const completedItemPaths: ItemPath[] = [];

  for (const [categoryName, category] of Object.entries(normalisedDict)) {
    const categoryFilteredByGameMode: NormalizedCategory = {
      name: category.name,
      description: category.description,
      totalPercent: 0,
      totalCount: 0,
      sections: {},
    };

    // Variables for tracking Hunter's Journal category's metadata
    let journalEncountered = 0;
    let journalCompleted = 0;
    const isJournalCategory = categoryName === "Hunter's Journal";

    let categoryCompletedPercent = 0;
    let categoryCompletedCount = 0;

    for (const [sectionName, section] of Object.entries(category.sections)) {
      const sectionFilteredByGameMode: NormalizedSection = {
        name: section.name,
        description: section.description,
        descriptionMarkup: section.descriptionMarkup,
        totalPercent: 0,
        totalCount: 0,
        act_0: {},
        act_1: {},
        act_2: {},
        act_3: {},
      };

      for (const actKey of ["act_0", "act_1", "act_2", "act_3"] as const) {
        for (const [itemName, item] of Object.entries(section[actKey])) {
          if (!isItemInCurrentGameMode(item, parsedJson)) {
            continue; // Skip items not in current game mode
          }

          const { unlocked, returnValue } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
          const killsAchieved = typeof returnValue === "number" ? returnValue : undefined;

          const itemWithSaveData = { ...item, unlocked, killsAchieved, value: returnValue };
          sectionFilteredByGameMode[actKey][itemName] = itemWithSaveData;
          sectionFilteredByGameMode.totalCount++;
          sectionFilteredByGameMode.totalPercent += item.completionPercent ?? 0;

          // Hunter's Journal metadata
          const isJournalEntry = isJournalCategory && killsAchieved !== undefined && item.killsRequired !== undefined;
          const isJournalEntryComplete = isJournalEntry && killsAchieved >= (item.killsRequired ?? 0);
          if (isJournalEntry) {
            if (killsAchieved > 0) journalEncountered++;
            if (isJournalEntryComplete) journalCompleted++;
          }

          const itemPath: ItemPath = `${categoryName}.${sectionName}.${actKey}.${itemName}`;

          if (!unlocked || (isJournalEntry && !isJournalEntryComplete)) {
            missingItemPaths.push(itemPath);
            continue;
          }

          completedItemPaths.push(itemPath);
          categoryCompletedCount++;
          categoryCompletedPercent += item.completionPercent ?? 0;
        }
      }

      if (sectionFilteredByGameMode.totalCount > 0) {
        categoryFilteredByGameMode.sections[sectionName] = sectionFilteredByGameMode;
        categoryFilteredByGameMode.totalCount += sectionFilteredByGameMode.totalCount;
        categoryFilteredByGameMode.totalPercent += sectionFilteredByGameMode.totalPercent;
      }
    }

    if (categoryFilteredByGameMode.totalCount > 0) {
      if (isJournalCategory) {
        categoryFilteredByGameMode.journalMeta = {
          encountered: journalEncountered,
          completed: journalCompleted,
        };
      }

      categoryFilteredByGameMode.completedCount = categoryCompletedCount;
      categoryFilteredByGameMode.completedPercent = categoryCompletedPercent;

      allItemsFilteredByGameMode[categoryName] = categoryFilteredByGameMode;

      totalCompletedPercent += categoryCompletedPercent;
    }
  }

  return {
    totalCompletedPercent,
    allItems: allItemsFilteredByGameMode,
    missingItemPaths,
    completedItemPaths,
  };
}

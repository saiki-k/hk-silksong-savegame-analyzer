import { TRACKED_CATEGORY_DICT } from "../dictionary";
import { isItemUnlockedInPlayerSave, isItemInCurrentGameMode } from "../dictionary/parsers";
import type { TrackableCategory, CategoryItem } from "../dictionary/types";

import { huntersJournal } from "../dictionary/categories/huntersJournal";

interface GetGenericProgressParams {
  parsedJson: unknown;
  isSaveFileDecrypted: boolean;
  inShowEverythingMode: boolean;
  tabLabel: string;
  isPercentProgression?: boolean;
}

interface ProgressData {
  progressType: "Count Progression" | "Percent Progression";
  current: number;
  total: number;
}

export function getGenericProgress({
  parsedJson,
  isSaveFileDecrypted,
  inShowEverythingMode,
  tabLabel,
  isPercentProgression = false,
}: GetGenericProgressParams): ProgressData | null {
  if (!isSaveFileDecrypted || !parsedJson) {
    return null;
  }

  const categoryData = TRACKED_CATEGORY_DICT[tabLabel] as TrackableCategory;
  if (!categoryData) {
    return null;
  }

  const allItems = categoryData.sections.flatMap(section => {
    const items =
      section.hasGameModeSpecificItems && !inShowEverythingMode
        ? section.items.filter(item => isItemInCurrentGameMode(item, parsedJson))
        : section.items;
    return items;
  });

  if (allItems.length === 0) {
    return null;
  }

  if (isPercentProgression) {
    let currentPercent = 0;
    let maxPercent = 0;

    if (!inShowEverythingMode) {
      allItems.forEach(item => {
        const percent = item.completionPercent ?? 0;
        maxPercent += percent;

        const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
        if (unlocked) {
          currentPercent += percent;
        }
      });
    }

    return {
      progressType: "Percent Progression",
      current: currentPercent,
      total: maxPercent,
    };
  }

  // Count-based progression
  let unlockedCount = 0;

  if (!inShowEverythingMode) {
    allItems.forEach(item => {
      const { unlocked } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
      if (unlocked) {
        unlockedCount += 1;
      }
    });
  }

  return {
    progressType: "Count Progression",
    current: unlockedCount,
    total: allItems.length,
  };
}

interface GetHuntersJournalProgressParams {
  parsedJson: unknown;
  isSaveFileDecrypted: boolean;
  inShowEverythingMode: boolean;
}

interface HuntersJournalProgressData {
  progressType: "Hunter's Journal Progression";
  completed: number;
  encountered: number;
  total: number;
}

export function getHuntersJournalProgress({
  parsedJson,
  isSaveFileDecrypted,
  inShowEverythingMode,
}: GetHuntersJournalProgressParams): HuntersJournalProgressData | null {
  if (!isSaveFileDecrypted || !parsedJson) {
    return null;
  }

  const journalEntries = huntersJournal.sections.flatMap(section => {
    return section.hasGameModeSpecificItems && !inShowEverythingMode
      ? section.items.filter(item => isItemInCurrentGameMode(item, parsedJson))
      : section.items;
  });

  if (journalEntries.length === 0) {
    return null;
  }

  let completed = 0;
  let encountered = 0;

  if (!inShowEverythingMode) {
    journalEntries.forEach(entry => {
      const { returnValue: killsAchieved } = isItemUnlockedInPlayerSave(entry.parsingInfo, parsedJson);
      if (
        killsAchieved !== undefined &&
        entry.killsRequired !== undefined &&
        typeof killsAchieved === "number" &&
        killsAchieved > 0
      ) {
        encountered += 1;
        if (killsAchieved >= entry.killsRequired) {
          completed += 1;
        }
      }
    });
  }

  return {
    progressType: "Hunter's Journal Progression",
    completed,
    encountered,
    total: journalEntries.length,
  };
}

export interface FilteredItem extends CategoryItem {
  unlocked: boolean;
  killsAchieved?: number;
}

interface FilterItemsParams {
  items: CategoryItem[];
  parsedJson: unknown;
  inShowEverythingMode: boolean;
  showUnlocked: boolean;
  actFilter?: Set<1 | 2 | 3>;
  hasGameModeSpecificItems?: boolean;
  isJournalCategory?: boolean;
}

export function filterItems({
  items,
  parsedJson,
  inShowEverythingMode,
  showUnlocked,
  actFilter,
  hasGameModeSpecificItems = false,
  isJournalCategory = false,
}: FilterItemsParams): FilteredItem[] {
  const result: FilteredItem[] = [];

  for (const item of items) {
    if (hasGameModeSpecificItems && !inShowEverythingMode && !isItemInCurrentGameMode(item, parsedJson)) {
      continue;
    }

    const { unlocked, returnValue: killsAchieved } = isItemUnlockedInPlayerSave(item.parsingInfo, parsedJson);
    const processedItem: FilteredItem = {
      ...item,
      unlocked,
      killsAchieved: typeof killsAchieved === "number" ? killsAchieved : undefined,
    };

    let shouldInclude = false;
    if (showUnlocked) {
      shouldInclude = true;
    } else if (isJournalCategory) {
      shouldInclude =
        !processedItem.unlocked || (processedItem.killsAchieved ?? 0) < (processedItem.killsRequired ?? 0);
    } else {
      shouldInclude = !processedItem.unlocked;
    }

    if (!shouldInclude) {
      continue;
    }

    if (actFilter && actFilter.size >= 0 && actFilter.size < 3) {
      // If whichAct is 0, item is not affected by actFilter
      if (processedItem.whichAct !== 0 && !actFilter.has(processedItem.whichAct as 1 | 2 | 3)) {
        continue;
      }
    }

    result.push(processedItem);
  }

  return result;
}
